"""add_short_url_logs_table

Revision ID: e8d0f0258f65
Revises: 9c0a1172df64
Create Date: 2026-06-28 21:39:16.095631

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e8d0f0258f65'
down_revision: Union[str, Sequence[str], None] = '9c0a1172df64'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table('short_url_logs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('short_code', sa.String(length=255), nullable=False),
    sa.Column('visited_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['short_code'], ['urls.short_code'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_short_url_logs_short_code'), 'short_url_logs', ['short_code'], unique=False)
    op.create_index(op.f('ix_short_url_logs_visited_at'), 'short_url_logs', ['visited_at'], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f('ix_short_url_logs_visited_at'), table_name='short_url_logs')
    op.drop_index(op.f('ix_short_url_logs_short_code'), table_name='short_url_logs')
    op.drop_table('short_url_logs')
