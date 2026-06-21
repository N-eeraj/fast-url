from sqlmodel import Session, select
from models.auth_tokens import AuthTokens

class AuthTokenRepository:
    @staticmethod
    async def create_auth_token(
        session: Session,
        user_id: int,
        hashed_token: str,
    ) -> str:
        auth_token = AuthTokens(
            user_id=user_id,
            token=hashed_token,
        )
        session.add(auth_token)
        session.commit()

        return auth_token

    @staticmethod
    async def delete_auth_token(
        session: Session,
        hashed_token: str,
    ) -> None:
        auth_token_statement = select(AuthTokens).where(AuthTokens.token == hashed_token)
        auth_token = session.exec(auth_token_statement).first()
        if auth_token:
            session.delete(auth_token)
            session.commit()
