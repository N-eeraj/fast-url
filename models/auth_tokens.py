from sqlmodel import SQLModel, Field
from datetime import datetime
from sqlalchemy import Column, ForeignKey, DateTime, func, text

class AuthTokens(SQLModel, table=True):
    __tablename__: str = "auth_tokens"

    id: int | None = Field(
        default=None,
        primary_key=True,
        nullable=False,
    )

    user_id: int = Field(
        sa_column=Column(
            ForeignKey("users.id"),
            index=True
        )
    )

    token: str = Field(
        unique=True,
        index=True,
    )

    created_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True),
            server_default=func.now(),
        ),
    )

    updated_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True),
            server_default=func.now(),
            onupdate=func.now(),
        ),
    )

    expires_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True),
            server_default=text("DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 24 HOUR)")
        ),
    )
