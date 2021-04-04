"""imports alerts seed data

Revision ID: cd08ff45566b
Revises: 09d38fd2f151
Create Date: 2021-04-03 18:24:30.530263

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column
from sqlalchemy import String, Integer, Text, Boolean, BigInteger
import json


# revision identifiers, used by Alembic.
revision = 'cd08ff45566b'
down_revision = '09d38fd2f151'
branch_labels = None
depends_on = None


def upgrade():
    with open('seed_data/alerts.json', 'r') as importedJSON:
        alertsList = json.loads(importedJSON.read())

    alerts_table = table('alert',
                         column('id', Integer),
                         column('errorId', String),
                         column('errorSeverity', String),
                         column('errorCategory', String),
                         column('errorMessage', String),
                         column('longMessage', Text),
                         column('errorTime', BigInteger),
                         column('selected', Boolean),
                         column('new', Boolean),
                         column('expanded', Boolean),
                         )

    op.bulk_insert(alerts_table, alertsList)


def downgrade():
    pass
