from fastapi import APIRouter, Request, Depends, status
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlmodel import Session
from database import get_session
from services.short_urls import ShortUrlsService
from core.templates import templates

router = APIRouter()

@router.get("/{path:path}", response_class=HTMLResponse)
async def redirect_route(
    request: Request,
    session: Session=Depends(get_session),
):
    short_code = request.path_params["path"]
    redirect_url = await ShortUrlsService.get_redirect_url(
        session=session,
        short_code=short_code,
    )

    if not redirect_url:
        return templates.TemplateResponse(
            request=request,
            status_code=status.HTTP_404_NOT_FOUND,
            name="not-found.html",
        )

    return RedirectResponse(
        url=redirect_url,
        status_code=status.HTTP_307_TEMPORARY_REDIRECT,
    )
