from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from dependencies.require_user import require_user
from sqlmodel import Session
from database import get_session
from schemas.short_urls import CreateShortUrlModel
from services.short_urls import ShortUrlsService

router = APIRouter(
    prefix="/short-urls",
    tags=["short-urls"],
    dependencies=[Depends(require_user)],
)

ROOT = ""

@router.post(ROOT, response_class=JSONResponse)
async def create_short_url(
    request: Request,
    body: CreateShortUrlModel,
    session: Session=Depends(get_session),
):
    data = await ShortUrlsService.create_short_url(
        session=session,
        user_id=request.state.user["id"],
        data=body,
    )

    return {
        "success": True,
        "message": "Shortened URL Successfully",
        "data": data,
    }

@router.get(ROOT, response_class=JSONResponse)
async def get_user_short_urls(
    request: Request,
    session: Session=Depends(get_session),
    search: str = "",
    page: int = 1,
    limit: int = 10,
    sort: str = "desc",
):
    filters = {
        "search": search.strip(),
        "page": page,
        "limit": limit,
        "sort": "asc" if sort.strip() == "asc" else "desc"
    }

    (data, meta_data) = await ShortUrlsService.get_short_url_list(
        session=session,
        user_id=request.state.user["id"],
        filters=filters,
    )

    return {
        "success": True,
        "message": "Fetched Shortened URLs Successfully",
        "data": data,
        "meta": meta_data
    }

@router.patch("/{id}/toggle-status", response_class=JSONResponse)
async def toggle_active_status(
    request: Request,
    id: int,
    session: Session=Depends(get_session),
):
    await ShortUrlsService.toggle_active_status(
        session=session,
        id=id,
        user_id=request.state.user["id"],
    )

    return {
        "success": True,
        "message": "Updated Status Successfully",
    }
