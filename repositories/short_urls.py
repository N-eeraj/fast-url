from sqlmodel import Session
from schemas.short_urls import ShortUrlDataModel, ShortUrlRecordModel

class ShortUrlsRepository:
    @staticmethod
    async def is_short_code_in_use(
        session: Session,
        short_code: str,
    ) -> bool:
        return

    @staticmethod
    async def create_short_code(
        session: Session,
        data: ShortUrlDataModel,
    ) -> ShortUrlRecordModel:
        return
