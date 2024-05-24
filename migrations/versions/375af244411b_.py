"""empty message

Revision ID: 375af244411b
Revises: d553f79f8bc6
Create Date: 2024-05-24 22:27:25.554160

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '375af244411b'
down_revision = 'd553f79f8bc6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=False))
        batch_op.create_unique_constraint(None, ['name'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('name')

    # ### end Alembic commands ###
