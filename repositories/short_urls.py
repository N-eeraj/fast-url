from sqlmodel import Session, select, update, func
from sqlalchemy import or_, and_, not_
from models.urls import Urls
from schemas.short_urls import ShortUrlDataModel, ShortUrlRecordModel

class ShortUrlsRepository:
    @staticmethod
    async def get_last_entry_id(
        session: Session,
    ) -> int:
        last_short_url_entry_statement = select(Urls.id).order_by(Urls.id.desc())
        last_entry_id = session.exec(last_short_url_entry_statement).first()
        return last_entry_id

    @staticmethod
    async def create_short_code(
        session: Session,
        data: ShortUrlDataModel,
    ):
        url = Urls(
            user_id=data.user_id,
            name=data.name,
            destination_url=data.destination_url,
            short_code=data.short_code,
            is_active=True,
        )
        
        session.add(url)
        session.commit()
        session.refresh(url)

        url = ShortUrlRecordModel.model_validate(url.model_dump())
        return url.model_dump()

    @staticmethod
    async def get_active_destination_url_by_id(
        session: Session,
        id: int,
    ):
        destination_url_statement = select(Urls.destination_url).where(
            and_(
                Urls.id == id,
                Urls.is_active == True,
            )
        )
        destination_url = session.exec(destination_url_statement).first()
        return destination_url

    @staticmethod
    async def get_short_url_list(
        session: Session,
        user_id: int,
        search: str,
        page: int,
        limit: int,
        sort: str,
    ):
        offset = (page - 1) * limit
        short_url_list_statement = select(
            Urls.id,
            Urls.name,
            Urls.destination_url,
            Urls.short_code,
            Urls.is_active,
            Urls.updated_at,
            Urls.created_at,
        ).where(
            Urls.user_id == user_id
        )

        if search:
            search_filter = or_(
                Urls.name.ilike(f"%{search}%"),
                Urls.destination_url.ilike(f"%{search}%"),
            )
            short_url_list_statement = short_url_list_statement.where(search_filter)

        if sort == "desc":
            short_url_list_statement = short_url_list_statement.order_by(Urls.created_at.desc())
        else:
            short_url_list_statement = short_url_list_statement.order_by(Urls.created_at.asc())

        short_url_list_statement = short_url_list_statement.offset(offset).limit(limit)

        short_url_list = session.exec(short_url_list_statement).mappings().all()

        total_count = session.exec(
            select(func.count()).select_from(Urls).where(
                Urls.user_id == user_id
            )
        ).one()

        return (short_url_list, total_count)

    @staticmethod
    async def toggle_active_status(
        session: Session,
        id: int,
        user_id: int
    ):
        toggle_active_status_statement = update(Urls).where(
            and_(
                Urls.id == id,
                Urls.user_id == user_id,
            )
        ).values(
            is_active=not_(Urls.is_active)
        )
        session.exec(toggle_active_status_statement)
        session.commit()
