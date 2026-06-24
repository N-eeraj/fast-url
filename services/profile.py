from fastapi import status
from fastapi.exceptions import HTTPException
from sqlmodel import Session
from repositories.user import UserRepository
from schemas.profile import UpdateProfileModel

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
            session,
            user_id,
            data,
        )
