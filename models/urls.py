from sqlmodel import SQLModel, Field
from sqlalchemy import Column, ForeignKey, String, DateTime, func
from datetime import datetime

class Urls(SQLModel, table=True):
    __tablename__ = "urls"

    id: int | None = Field(
        default=None,
        primary_key=True,
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

    name: str = Field(
        sa_column=Column(
            String(255),
            nullable=False,
        )
    )

    destination_url: str = Field(
        sa_column=Column(
            String(768),
            nullable=False,
        )
    )

    short_code: str = Field(
        sa_column=Column(
            String(255),
            unique=True,
            nullable=False,
        )
    )

    is_active: bool = Field(
        default=True,
        nullable=False,
    )

    created_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True),
            server_default=func.now(),
            nullable=False,
        ),
    )

    updated_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True),
            server_default=func.now(),
            onupdate=func.now(),
            nullable=False,
        ),
    )
