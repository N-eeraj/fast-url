from sqlmodel import Session, select
from models.urls import Urls
from schemas.short_urls import ShortUrlDataModel, ShortUrlRecordModel

class ShortUrlsRepository:
    @staticmethod
    async def get_last_entry_id(
        session: Session,
    ) -> bool:
        last_short_url_entry_statement = select(Urls.id).order_by(Urls.id.desc())
        last_entry_id = session.exec(last_short_url_entry_statement).first()
        return last_entry_id

    @staticmethod
    async def create_short_code(
        session: Session,
        data: ShortUrlDataModel,
    ) -> ShortUrlRecordModel:
        url = Urls(
            user_id=data.user_id,
            short_code=data.short_code,
            destination_url=data.destination_url,
        )
        
        session.add(url)
        session.commit()
        session.refresh(url)

        url = ShortUrlRecordModel.model_validate(url.model_dump())
        return url.model_dump()
