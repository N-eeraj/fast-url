from fastapi import HTTPException, status
from schemas.auth import RegisterModel, LoginModel
from sqlmodel import Session
import secrets
import bcrypt
import hmac
import hashlib
from repositories.user import UserRepository
from repositories.auth_token import AuthTokenRepository
from schemas.auth import UserResponseModel
from config import Settings

settings = Settings()

class AuthService:
    @staticmethod
    async def generate_auth_token(
        session: Session,
        user_id: int,
    ) -> str:
        token: str = secrets.token_hex(32)
        hashed_token: str = hmac.new(
            settings.TOKEN_SECRET.encode("utf-8"),
            token.encode("utf-8"),
            hashlib.sha256
        ).hexdigest()

        await AuthTokenRepository.create_auth_token(
            session=session,
            hashed_token=hashed_token,
            user_id=user_id,
        )
        return token

    @staticmethod
    async def register(
        session: Session,
        data: RegisterModel,
    ) -> tuple[UserResponseModel, str]:
        has_existing_user = await UserRepository.user_exists_by_email(session, data.email)
        if has_existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={
                    "message": "User already exists, login to continue",
                },
            )

        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(data.password.encode("utf-8"), salt)

        new_user = await UserRepository.create_user(
            session=session,
            email=data.email,
            name=data.name,
            hashed_password=hashed_password,
        )

        auth_token = await AuthService.generate_auth_token(session, new_user["id"])

        return (
            new_user,
            auth_token,
        )

    @staticmethod
    async def login(
        session: Session,
        data: LoginModel,
    ) -> tuple[UserResponseModel, str]:
        user_by_email = await UserRepository.get_user_by_email(session, data.email)
        if not user_by_email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "message": "Invalid Credentials",
                }
            )

        is_matching_password = bcrypt.checkpw(
            data.password.encode("utf-8"),
            user_by_email["password"].encode("utf-8"),
        )
        if not is_matching_password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "message": "Invalid Credentials",
                }
            )

        auth_token = await AuthService.generate_auth_token(session, user_by_email["id"])
        user = UserResponseModel.model_validate(user_by_email)

        return (
            user,
            auth_token,
        )

    @staticmethod
    async def logout(
        session: Session,
        hashed_token: str
    ) -> None:
        await AuthTokenRepository.delete_auth_token(session, hashed_token)