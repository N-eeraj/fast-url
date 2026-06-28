from fastapi import APIRouter, Request, Depends, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.exceptions import HTTPException
from sqlmodel import Session
from database import get_session
from services.short_urls import ShortUrlsService
from core.templates import templates
from core.rate_limiter import REDIRECT_RULE, check_rate_limit

router = APIRouter()

@router.get("/{path:path}", response_class=HTMLResponse)
async def redirect_route(
    request: Request,
    session: Session=Depends(get_session),
):
    short_code = request.path_params["path"]
    short_url = await ShortUrlsService.get_redirect_url(
        session=session,
        short_code=short_code,
    )

    if not short_url:
        return templates.TemplateResponse(
            request=request,
            status_code=status.HTTP_404_NOT_FOUND,
            name="not-found.html",
        )

    (
        destination_url,
        user_id,
    ) = short_url


    key = f"user:{user_id}"

    allowed = check_rate_limit(
        rule=REDIRECT_RULE,
        key=key,
    )

    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={
                "message": "Too much requests, please try again later",
            },
        )

    return RedirectResponse(
        url=destination_url,
        status_code=status.HTTP_307_TEMPORARY_REDIRECT,
    )
