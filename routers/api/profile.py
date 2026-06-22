from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from dependencies.require_user import require_user
from schemas.auth import UserResponseModel

router = APIRouter(
    prefix="/profile",
    tags=["profile"],
    dependencies=[Depends(require_user)],
)

@router.get("", response_class=JSONResponse)
async def profile(
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
