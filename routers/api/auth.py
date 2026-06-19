from fastapi import APIRouter, status, Depends
from schemas.auth import RegisterModel, LoginModel
from sqlmodel import Session
from services.auth import AuthService
from database import get_session

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    body: RegisterModel,
    session: Session=Depends(get_session),
):
    data = await AuthService.register(session, body)

    return {
        "success": True,
        "data": data,
    }


@router.post("/login")
async def login(
    body: LoginModel,
    session: Session=Depends(get_session),
):
    data = await AuthService.login(session, body)

    return {
        "success": True,
        "data": data,
    }
