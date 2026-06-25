from sqlmodel import SQLModel, Field
from sqlalchemy import Column, ForeignKey, String, DateTime, func, text
from datetime import datetime

class AuthTokens(SQLModel, table=True):
    __tablename__= "auth_tokens"

    id: int | None = Field(
        default=None,
        primary_key=True,
        nullable=False,
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

    token: str = Field(
        sa_column=Column(
            String(255),
            index=True,
            unique=True,
            nullable=False,
        )
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

    expires_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True),
            server_default=text("DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 24 HOUR)"),
            nullable=False,
        ),
    )
