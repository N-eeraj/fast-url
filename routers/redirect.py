from fastapi import APIRouter, Request, status
from fastapi.responses import HTMLResponse
from core.templates import templates

router = APIRouter()

@router.get("/{path:path}", response_class=HTMLResponse)
def redirect_route(request: Request):
    print(request.path_params["path"])

    return templates.TemplateResponse(
        request=request,
        status_code=status.HTTP_404_NOT_FOUND,
        name="not-found.html",
    )
