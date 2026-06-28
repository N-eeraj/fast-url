from sqlmodel import Session
from datetime import datetime
from models.short_url_logs import ShortUrlLogs

class ShortUrlLogsRepository:
    @staticmethod
    async def create_log(
        session: Session,
        short_code: str,
        visited_at: datetime,
    ):
        short_url_log = ShortUrlLogs(
            short_code=short_code,
            visited_at=visited_at,
        )
        session.add(short_url_log)
        session.commit()
