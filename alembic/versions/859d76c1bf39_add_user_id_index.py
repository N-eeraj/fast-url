"""add_user_id_index

Revision ID: 859d76c1bf39
Revises: 19da9899d001
Create Date: 2026-07-01 20:24:46.155938

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '859d76c1bf39'
down_revision: Union[str, Sequence[str], None] = '19da9899d001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column('short_url_logs', 'user_id',
               existing_type=mysql.INTEGER(),
               nullable=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column('short_url_logs', 'user_id',
               existing_type=mysql.INTEGER(),
               nullable=True)
