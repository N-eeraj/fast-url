from fastapi import APIRouter, Query, Request, Depends
from fastapi.responses import JSONResponse
from dependencies.require_user import require_user
from dependencies.rate_limiter.user_rate_limiter import user_rate_limiter
from sqlmodel import Session
from database import get_session
from datetime import datetime
from schemas.short_urls import ShortUrlModel
from services.short_urls import ShortUrlsService

router = APIRouter(
    prefix="/short-urls",
    tags=["short-urls"],
    dependencies=[
        Depends(require_user),
        Depends(user_rate_limiter),
    ],
)

ROOT = ""

@router.post(ROOT, response_class=JSONResponse)
async def create_short_url(
    request: Request,
    body: ShortUrlModel,
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

@router.patch("/{id}", response_class=JSONResponse)
async def update_short_url(
    request: Request,
    id: int,
    body: ShortUrlModel,
    session: Session=Depends(get_session),
):
    await ShortUrlsService.update_short_url(
        session=session,
        id=id,
        user_id=request.state.user["id"],
        data=body,
    )

    return {
        "success": True,
        "message": "Updated Short URL Successfully",
    }


@router.delete("/{id}", response_class=JSONResponse)
async def delete_short_url(
    request: Request,
    id: int,
    session: Session=Depends(get_session),
):
    await ShortUrlsService.delete_short_url(
        session=session,
        id=id,
        user_id=request.state.user["id"],
    )

    return {
        "success": True,
        "message": "Deleted Short URL Successfully",
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

@router.get("/{short_code}/analytics", response_class=JSONResponse)
async def get_short_url_analytics(
    request: Request,
    short_code: str,
    from_datetime: datetime=Query(alias="from"),
    to_datetime: datetime=Query(alias="to"),
    session: Session=Depends(get_session),
):
    data = await ShortUrlsService.get_short_url_analytics(
        session=session,
        user_id=request.state.user["id"],
        short_code=short_code,
        from_datetime=from_datetime,
        to_datetime=to_datetime,
    )

    return {
        "success": True,
        "message": "Fetched Analytics Successfully",
        "data": data,
    }
