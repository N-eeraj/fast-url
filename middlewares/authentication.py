from fastapi import Request, Depends
from fastapi.exceptions import HTTPException
from repositories.user import UserRepository
from sqlmodel import Session
from database import get_session
import hmac
import hashlib
from schemas.auth import CurrentUserModel
from config import Settings

settings = Settings()

async def auth_middleware(
    request: Request,
    session: Session=Depends(get_session),
) -> CurrentUserModel:
    auth_token = request.cookies.get("auth_token")
    if not auth_token:
        raise HTTPException(
            status_code=401,
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
        raise HTTPException(
            status_code=401,
            detail={
                "message": "Unauthenticated User",
            }
        )

    return {
        **user,
        "auth_token": auth_token,
        "hashed_token": hashed_token,
    }
