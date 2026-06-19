from sqlmodel import Session
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