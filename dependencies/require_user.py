from fastapi import Request, Response, Depends, status
from fastapi.exceptions import HTTPException
from repositories.user import UserRepository
from sqlmodel import Session
from database import get_session
import hmac
import hashlib
from schemas.auth import CurrentUserModel
from config import Settings

settings = Settings()

async def require_user(
    request: Request,
    response: Response,
    session: Session=Depends(get_session),
) -> CurrentUserModel:
    auth_token = request.cookies.get("auth_token")
    if not auth_token:
        response.delete_cookie(key="auth_token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "Unauthenticated User",
            }
        )

    hashed_token: str = hmac.new(
        settings.TOKEN_SECRET.encode("utf-8"),
        auth_token.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()
    user = await UserRepository.get_user_by_token(session, hashed_token)

    if not user:
        response.delete_cookie(key="auth_token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "Unauthenticated User",
            }
        )

    current_user = CurrentUserModel.model_validate({
        **user,
        "hashed_token": hashed_token,
    }).model_dump()

    request.state.user = current_user

    return current_user
