from sqlmodel import Session, func
from sqlalchemy import select, insert
from database import engine
from models.short_url_logs import ShortUrlLogs
from models.short_url_log_analytics_30m import ShortUrlLogsAnalytics30m

BUCKET_SIZE_IN_SECONDS = 1800 # 30 minutes

visited_at_to_bucket_start = func.from_unixtime(
    func.floor(
        func.unix_timestamp(ShortUrlLogs.visited_at) / BUCKET_SIZE_IN_SECONDS
    ) * BUCKET_SIZE_IN_SECONDS
)

statement = insert(ShortUrlLogsAnalytics30m).from_select(
    [
        "short_code",
        "user_id",
        "count",
        "bucket_start",
    ],
    select(
        ShortUrlLogs.short_code,
        ShortUrlLogs.user_id,
        func.count(ShortUrlLogs.id),
        visited_at_to_bucket_start,
    ).group_by(
        ShortUrlLogs.short_code,
        ShortUrlLogs.user_id,
        visited_at_to_bucket_start,
    )
)

with Session(engine) as session:
    session.exec(statement)
    session.commit()
