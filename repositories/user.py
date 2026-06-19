from sqlmodel import Session, select
from models.users import Users
from schemas.auth import UserResponseModel

class UserRepository:
    @staticmethod
    async def user_exists_by_email(
        session: Session,
        email: str,
    ) -> bool:
        user_by_email_statement = select(Users.id).where(Users.email == email)
        user = session.exec(user_by_email_statement).first()
        return user != None

    @staticmethod
    async def create_user(
        session: Session,
        email: str,
        name: str,
        hashed_password: str,
    ) -> UserResponseModel:
        user = Users(
            email=email,
            name=name,
            password=hashed_password,
        )
        session.add(user)
        session.commit()
        session.refresh(user)

        user = UserResponseModel.model_validate(user.model_dump())
        return user.model_dump()
