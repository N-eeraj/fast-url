from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from dependencies.require_user import require_user
from dependencies.rate_limiter.user_rate_limiter import user_rate_limiter
from sqlmodel import Session
from database import get_session
from services.profile import ProfileService
from schemas.auth import UserResponseModel
from schemas.profile import UpdateProfileModel, UpdatePasswordModel

router = APIRouter(
    prefix="/profile",
    tags=["profile"],
    dependencies=[
        Depends(require_user),
        Depends(user_rate_limiter),
    ],
)

ROOT = ""

@router.get(ROOT, response_class=JSONResponse)
async def get_profile(
    request: Request,
):
    data = UserResponseModel.model_validate(
        request.state.user
    ).model_dump()

    return {
        "success": True,
        "message": "User Details Fetched Successfully",
        "data": data,
    }

@router.patch(ROOT, response_class=JSONResponse)
async def update_profile(
    request: Request,
    body: UpdateProfileModel,
    session: Session=Depends(get_session),
):
    await ProfileService.update_user(
        session=session,
        user_id=request.state.user["id"],
        data=body,
    )

    return {
        "success": True,
        "message": "User Details Updated Successfully",
    }

@router.patch("/change-password", response_class=JSONResponse)
async def change_password(
    request: Request,
    body: UpdatePasswordModel,
    session: Session=Depends(get_session),
):
    await ProfileService.update_password(
        session=session,
        user_id=request.state.user["id"],
        data=body,
    )

    return {
        "success": True,
        "message": "Password Updated Successfully",
    }
