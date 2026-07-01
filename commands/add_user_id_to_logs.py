from sqlmodel import Session
from sqlalchemy import select, update
from database import engine
from models.urls import Urls
from models.short_url_logs import ShortUrlLogs

statement = (
    update(ShortUrlLogs).values(
        user_id=select(Urls.user_id)
        .where(Urls.short_code == ShortUrlLogs.short_code)
        .scalar_subquery()
    )
)

with Session(engine) as session:
    data = session.exec(statement)
    session.commit()
