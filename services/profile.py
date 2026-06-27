from fastapi import status
from fastapi.exceptions import HTTPException
from sqlmodel import Session
import bcrypt
from repositories.user import UserRepository
from schemas.profile import UpdateProfileModel, UpdatePasswordModel

class ProfileService:
    @staticmethod
    async def update_user(
        session: Session,
        user_id: int,
        data: UpdateProfileModel,
    ):
        user_by_email = await UserRepository.get_user_by_email(session, data.email)
        if user_by_email and user_by_email["id"] != user_id:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={
                    "message": "Email already in use",
                    "email": "This email is already in use",
                }
            )

        await UserRepository.update_user(
            session=session,
            user_id=user_id,
            data=data,
        )

    @staticmethod
    async def update_password(
        session: Session,
        user_id: int,
        data: UpdatePasswordModel,
    ):
        user_by_id = await UserRepository.get_user_by_id(
            session=session,
            user_id=user_id,
        )

        is_matching_password = bcrypt.checkpw(
            data.password.encode("utf-8"),
            user_by_id["password"].encode("utf-8"),
        )
        if not is_matching_password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "message": "Invalid Credentials",
                    "password": "Incorrect password",
                }
            )

        salt = bcrypt.gensalt()
        hashed_new_password = bcrypt.hashpw(data.new_password.encode("utf-8"), salt)

        await UserRepository.update_password(
            session=session,
            user_id=user_id,
            hashed_password=hashed_new_password,
        )
