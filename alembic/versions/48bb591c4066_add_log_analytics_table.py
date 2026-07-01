"""add_log_analytics_table

Revision ID: 48bb591c4066
Revises: 859d76c1bf39
Create Date: 2026-07-01 23:15:10.251062

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '48bb591c4066'
down_revision: Union[str, Sequence[str], None] = '859d76c1bf39'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table('short_url_log_analytics_30m',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('bucket_start', sa.DateTime(), nullable=False),
    sa.Column('short_code', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['short_code'], ['urls.short_code'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_short_url_log_analytics_30m_bucket_start'), 'short_url_log_analytics_30m', ['bucket_start'], unique=False)
    op.create_index(op.f('ix_short_url_log_analytics_30m_short_code'), 'short_url_log_analytics_30m', ['short_code'], unique=False)
    op.create_index(op.f('ix_short_url_log_analytics_30m_user_id'), 'short_url_log_analytics_30m', ['user_id'], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f('ix_short_url_log_analytics_30m_user_id'), table_name='short_url_log_analytics_30m')
    op.drop_index(op.f('ix_short_url_log_analytics_30m_short_code'), table_name='short_url_log_analytics_30m')
    op.drop_index(op.f('ix_short_url_log_analytics_30m_bucket_start'), table_name='short_url_log_analytics_30m')
    op.drop_table('short_url_log_analytics_30m')
