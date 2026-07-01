from sqlmodel import Session, select
from sqlalchemy import and_
from datetime import datetime
from models.short_url_logs import ShortUrlLogs
from models.urls import Urls

class ShortUrlLogsRepository:
    @staticmethod
    async def create_log(
        session: Session,
        short_code: str,
        visited_at: datetime,
    ):
        user_id_fetch_statement = select(Urls.user_id).where(
            Urls.short_code == short_code,
        )
        url_user_id = session.exec(user_id_fetch_statement).first()

        short_url_log = ShortUrlLogs(
            short_code=short_code,
            user_id=url_user_id,
            visited_at=visited_at,
        )
        session.add(short_url_log)
        session.commit()

    @staticmethod
    async def get_short_url_analytics(
        session: Session,
        user_id: int,
        short_code: str,
        from_datetime: datetime,
        to_datetime: datetime,
    ):
        fetch_logs_statement = select(ShortUrlLogs.visited_at).where(
            and_(
                Urls.user_id == user_id,
                Urls.short_code == ShortUrlLogs.short_code,
                ShortUrlLogs.short_code == short_code,
                ShortUrlLogs.visited_at >= from_datetime,
                ShortUrlLogs.visited_at <= to_datetime,
            )
        )
        fetch_logs = session.exec(fetch_logs_statement).all()
        return fetch_logs
