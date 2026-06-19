from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.responses import HTMLResponse
from fastapi.exceptions import RequestValidationError, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from datetime import datetime, timezone
from routers import api
from database import create_db_and_tables
from core.exception_handlers import custom_validation_exception_handler, custom_http_exception_handler

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting Up Server")
    create_db_and_tables()

    yield

    print("Shutting Down Server")

app = FastAPI(
    lifespan=lifespan
)

templates = Jinja2Templates(directory="templates")
dashboard_app_template = Jinja2Templates(directory="dashboard-app/dist")

@app.get("/health")
async def health():
    return {
        "success": True,
        "message": "Fast URL Server is running",
        "data": {
            "status": "ok",
            "timestamp": datetime.now(timezone.utc),
        },
    }


@app.get("/", response_class=HTMLResponse)
def landing_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
    )


app.include_router(api.router)


@app.get("/app/{path:path}", response_class=HTMLResponse)
@app.get("/app", response_class=HTMLResponse)
def dashboard_app(request: Request):
    return dashboard_app_template.TemplateResponse(
        request=request,
        name="index.html",
    )


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

@app.get("/{path:path}", response_class=HTMLResponse)
def redirect_route(request: Request):
    return templates.TemplateResponse(
        request=request,
        status_code=status.HTTP_404_NOT_FOUND,
        name="not-found.html",
    )

app.add_exception_handler(RequestValidationError, custom_validation_exception_handler)
app.add_exception_handler(HTTPException, custom_http_exception_handler)
