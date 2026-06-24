from sqlmodel import Session, select, update
from sqlalchemy import func
from models.users import Users
from models.auth_tokens import AuthTokens
from schemas.auth import UserResponseModel, UserWithPasswordModel
from schemas.profile import UpdateProfileModel

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

    @staticmethod
    async def get_user_by_id(
        session: Session,
        id: int
    ) -> UserWithPasswordModel | None:
        user_by_id_statement = select(
            Users.id,
            Users.name,
            Users.email,
            Users.password,
        ).where(Users.id == id)
        user_by_id = session.exec(user_by_id_statement).first()

        if not user_by_id: return None
        user = UserWithPasswordModel.model_validate(user_by_id._mapping)
        return user.model_dump()

    @staticmethod
    async def get_user_by_email(
        session: Session,
        email: str
    ) -> UserWithPasswordModel | None:
        user_by_email_statement = select(
            Users.id,
            Users.name,
            Users.email,
            Users.password,
        ).where(Users.email == email)
        user_by_email = session.exec(user_by_email_statement).first()

        if not user_by_email: return None
        user = UserWithPasswordModel.model_validate(user_by_email._mapping)
        return user.model_dump()

    @staticmethod
    async def get_user_by_token(
        session: Session,
        hashed_token: str,
    ) -> UserResponseModel | None:
        user_by_token_statement = select(
            Users.id,
            Users.name,
            Users.email,
        ).join(
            AuthTokens,
            AuthTokens.user_id == Users.id,
        ).where(
            (AuthTokens.token == hashed_token) & (AuthTokens.expires_at > func.now())
        )
        user_by_token = session.exec(user_by_token_statement).first()

        if not user_by_token: return None
        user = UserResponseModel.model_validate(user_by_token._mapping)
        return user.model_dump()

    @staticmethod
    async def update_user(
        session: Session,
        user_id: int,
        data: UpdateProfileModel,
    ):
        values = data.model_dump(exclude_unset=True)
        update_profile_statement = update(Users).where(
            Users.id == user_id,
        ).values(
            **values
        )
        session.exec(update_profile_statement)
        session.commit()

    @staticmethod
    async def update_password(
        session: Session,
        user_id: int,
        hashed_password: str,
    ):
        update_password_statement = update(Users).where(
            Users.id == user_id,
        ).values(
            password=hashed_password,
        )
        session.exec(update_password_statement)
        session.commit()
