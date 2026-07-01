"""add_user_id_to_logs

Revision ID: 19da9899d001
Revises: e8d0f0258f65
Create Date: 2026-07-01 20:08:12.946751

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '19da9899d001'
down_revision: Union[str, Sequence[str], None] = 'e8d0f0258f65'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_index(op.f('ix_short_url_logs_user_id'), table_name='short_url_logs')
    op.create_foreign_key(None, 'short_url_logs', 'urls', ['short_code'], ['short_code'], ondelete='CASCADE')


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(None, 'short_url_logs', type_='foreignkey')
    op.create_index(op.f('ix_short_url_logs_user_id'), 'short_url_logs', ['user_id'], unique=False)
