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
