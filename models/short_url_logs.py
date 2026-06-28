from sqlmodel import SQLModel, Field
from sqlalchemy import Column, ForeignKey, String
from datetime import datetime

class ShortUrlLogs(SQLModel, table=True):
    __tablename__= "short_url_logs"

    id: int | None = Field(
        default=None,
        primary_key=True,
        nullable=False,
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

    visited_at: datetime = Field(
        nullable=False,
        index=True,
    )

