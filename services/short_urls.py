from sqlmodel import Session

class ShortUrlsService:
    @staticmethod
    async def create_short_url(
        session: Session,
        user_id: int,
        destination_url: str,
    ) -> str:
        print(user_id)
        print(destination_url)

        return "http://localhost:8000/redirect-test"
