from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routers import api
from datetime import datetime, timezone

app = FastAPI()

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

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(_request: Request, exception: HTTPException):
    return JSONResponse(
        status_code=exception.status_code,
        content={
            "error": exception.detail,
        },
    )
