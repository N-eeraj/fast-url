from sqlmodel import SQLModel, Field
from sqlalchemy import Column, ForeignKey, String
from datetime import datetime

class ShortUrlLogsAnalytics30m(SQLModel, table=True):
    __tablename__= "short_url_log_analytics_30m"

    id: int | None = Field(
        default=None,
        primary_key=True,
        nullable=False,
    )

    bucket_start: datetime = Field(
        nullable=False,
        index=True,
    )

    short_code: str = Field(
        sa_column=Column(
            String(255),
            ForeignKey(
                "urls.short_code",
                ondelete="CASCADE",
            ),
            nullable=False,
            index=True,
        )
    )

    user_id: int = Field(
        sa_column=Column(
            ForeignKey(
                "users.id",
                ondelete="CASCADE",
            ),
            index=True,
            nullable=False,
        )
    )

    count: int = Field(
        default=0,
        nullable=False,
    )
