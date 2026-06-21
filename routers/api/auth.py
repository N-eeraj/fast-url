from fastapi import APIRouter, Response, status, Depends
from schemas.auth import RegisterModel, LoginModel
from sqlmodel import Session
from services.auth import AuthService
from database import get_session
from middlewares.authentication import auth_middleware
from schemas.auth import CurrentUserModel

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

AUTH_TOKEN_AGE = 86_400, # 1 day in seconds

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    response: Response,
    body: RegisterModel,
    session: Session=Depends(get_session),
):
    (data, auth_token) = await AuthService.register(session, body)

    response.set_cookie(
        key="auth_token",
        value=auth_token,
        httponly=True,
        max_age=AUTH_TOKEN_AGE,
    )

    return {
        "success": True,
        "data": data,
        "message": "Registered Successfully",
    }

@router.post("/login")
async def login(
    response: Response,
    body: LoginModel,
    session: Session=Depends(get_session),
):
    (data, auth_token) = await AuthService.login(session, body)

    response.set_cookie(
        key="auth_token",
        value=auth_token,
        httponly=True,
        max_age=AUTH_TOKEN_AGE,
    )

    return {
        "success": True,
        "data": data,
        "message": "Logged In Successfully",
    }

@router.post("/logout")
async def logout(
    response: Response,
    session: Session=Depends(get_session),
    current_user: CurrentUserModel=Depends(auth_middleware),
):
    await AuthService.logout(session, current_user["hashed_token"])

    response.delete_cookie(key="auth_token")

    return {
        "success": True,
        "message": "Logged Out Successfully",
    }