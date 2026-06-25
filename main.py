from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError, HTTPException
from fastapi.staticfiles import StaticFiles
from datetime import datetime, timezone
from routers import pages, api, redirect
from core.logger import logger, setup_logging
from core.exception_handlers import custom_validation_exception_handler, custom_http_exception_handler

setup_logging()

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Up Server")

    yield

    logger.info("Shutting Down Server")

app = FastAPI(
    title="Fast URL Server",
    version="1.0.0",
    description="URL shortener service",
    lifespan=lifespan,
)

# statics
app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static",
)
app.mount(
    "/dashboard-app",
    StaticFiles(directory="dashboard-app/dist"),
    name="dashboard-app-static",
)

# health check route
@app.get("/health")
async def health():
    return {
        "success": True,
        "message": "Fast URL Server is running",
        "data": {
            "status": "ok",
            "timestamp": datetime.now(timezone.utc).isoformat(),
        },
    }

# routers
app.include_router(pages.router)
app.include_router(api.router)
app.include_router(redirect.router)

# custom exception handlers
app.add_exception_handler(RequestValidationError, custom_validation_exception_handler)
app.add_exception_handler(HTTPException, custom_http_exception_handler)
