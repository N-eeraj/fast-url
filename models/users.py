from sqlmodel import SQLModel, Field
from datetime import datetime
from sqlalchemy import Column, DateTime, func

class Users(SQLModel, table=True):
    id: int | None = Field(
        default=None,
        primary_key=True,
    )

    name: str

    email: str = Field(
        unique=True,
        index=True,
    )

    password: str

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
