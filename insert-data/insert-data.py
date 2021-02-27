import psycopg2
import json

# db = 

with open('./alerts.json') as alerts:
  alertsData = json.load(alerts)

with open('./contacts.json') as contacts:
  contactsData = json.load(contacts)

insert_into_alerts = """INSERT INTO alerts(errorId, errorSeverity, errorCategory, errorMessage, longMessage, errorTime, selected, new, expanded)
                        VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)"""

insert_into_contacts = """INSERT INTO contacts(_id, contactId, contactStatus, contactName, contactGround, contactSatellite, contactEquipment, contactState, contactStep, contactDetail, contactBeginTimestamp, contactEndTimestamp, contactLatitude, contactLongitude, contactAzimuth, contactElevation, contactResolution, contactResolutionStatus)
                          VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

insert_into_users = """INSERT INTO users(username, password)
                        VALUES(%s, %s)"""
# def convert_to_list(json_data):

drop_users_table = """DELETE FROM users"""

drop_tables = """DROP TABLE alerts, contacts, users"""

view_table = """SELECT * FROM contacts;"""

def insert_data():
  conn = psycopg2.connect(db, sslmode="require")
  cur = conn.cursor()

  for obj in alertsData:
    values = []
    for key, value in obj.items():
      values.append(value)
    cur.execute(insert_into_alerts, values)

  for obj in contactsData:
    values = []
    for key, value in obj.items():
      values.append(value)
    cur.execute(insert_into_contacts, values)

  cur.execute(insert_into_users, ("admin", "password"))
  # cur.execute(view_table)
  # print(cur.fetchone())

  conn.commit()
  cur.close()
  conn.close()
if __name__ == '__main__':
    insert_data()