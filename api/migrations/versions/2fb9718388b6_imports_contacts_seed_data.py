"""imports contacts seed data

Revision ID: 2fb9718388b6
Revises: cd08ff45566b
Create Date: 2021-04-03 18:25:39.722012

"""
from alembic import op
from sqlalchemy.sql import table, column
from sqlalchemy import String, Integer, Text, BigInteger, Float
import json


# revision identifiers, used by Alembic.
revision = '2fb9718388b6'
down_revision = 'cd08ff45566b'
branch_labels = None
depends_on = None


def upgrade():
    with open('seed_data/contacts.json', 'r') as importedJSON:
        contactsList = json.loads(importedJSON.read())

    contacts_table = table('contact',
                           column('id', Integer),
                           column('_id', String),
                           column('contactId', String),
                           column('contactStatus', String),
                           column('contactName', Integer),
                           column('contactGround', String),
                           column('contactSatellite', String),
                           column('contactEquipment', String),
                           column('contactState', String),
                           column('contactStep', String),
                           column('contactDetail', Text),
                           column('contactBeginTimestamp', BigInteger),
                           column('contactEndTimestamp', BigInteger),
                           column('contactLatitude', Float),
                           column('contactLongitude', Float),
                           column('contactAzimuth', Float),
                           column('contactElevation', Float),
                           column('contactResolution', String),
                           column('contactResolutionStatus', String)
                           )

    op.bulk_insert(contacts_table, contactsList)


def downgrade():
    pass
