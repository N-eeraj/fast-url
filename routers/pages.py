from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from core.templates import templates, dashboard_app_template

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
def landing_page(request: Request):
    is_authenticated = bool(request.cookies.get("auth_token"))
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "is_authenticated": is_authenticated,
        }
    )

@router.get("/app", response_class=HTMLResponse)
@router.get("/app/{path:path}", response_class=HTMLResponse)
def dashboard_app(request: Request):
    return dashboard_app_template.TemplateResponse(
        request=request,
        name="index.html",
    )
