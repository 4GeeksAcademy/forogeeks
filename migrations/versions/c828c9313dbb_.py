"""empty message

Revision ID: c828c9313dbb
Revises: a05c2de2361a
Create Date: 2024-03-13 18:02:14.350876

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c828c9313dbb'
down_revision = 'a05c2de2361a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'profile_picture',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=400),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'profile_picture',
               existing_type=sa.String(length=400),
               type_=sa.VARCHAR(length=120),
               existing_nullable=True)
    # ### end Alembic commands ###