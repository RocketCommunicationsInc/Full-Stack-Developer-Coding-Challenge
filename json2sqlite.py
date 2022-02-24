from datetime import datetime
import json
import re
import sqlite3

ID_FIELD_NAME = '_id'
DB_NAME = 'db.sqlite3'

def jsonfile2dict(filename):
  res = {}
  # Opening JSON file
  with open(filename) as json_file:
    res = json.load(json_file)
  return res


def timestamp2datetime(timestamp):
  return datetime.fromtimestamp(timestamp)


def uppercase2undercase(s):
  return s[0].lower() + re.sub(r'(?!^)[A-Z]', lambda x: '_' + x.group(0).lower(), s[1:])


def get_columns(item):
  columns = list(item.keys())
  return columns


def json2sqlite(filename, tablename, db, timestampe_field_names=[], is_milliseconds=False, need_auto_id=False):
  json_data = jsonfile2dict(f'{filename}.json')
  columns = get_columns(json_data[0])
  renamed_columns = [uppercase2undercase(c) for c in columns]
  if need_auto_id:
    renamed_columns.insert(0, ID_FIELD_NAME)

  value = []
  values = []
  cursor = db.cursor()

  drop_query = f"drop table if exists {tablename}"
  create_query = f"create table if not exists {tablename} ({' text,'.join(renamed_columns)})"
  
  cursor.execute(drop_query)
  cursor.execute(create_query)

  index = 0
  for data in json_data:
    index += 1
    value = []
    if need_auto_id:
      value.append(index)
    for c in columns:
      v = dict(data).get(c)
      if c in timestampe_field_names:
        if is_milliseconds:
          v = v / 1000
        v = timestamp2datetime(v)
      value.append(str(v))
    insert_query = f"insert into {tablename} ({','.join(renamed_columns)}) values (?{',?' * (len(renamed_columns)-1)})"
    cursor.execute(insert_query , value)
    db.commit()
  cursor.close()
  

def main():
  db = sqlite3.connect(DB_NAME)

  timestampe_fields = [
    'contactBeginTimestamp',
    'contactEndTimestamp',
  ]
  json2sqlite('contacts', 'item_contact', db, timestampe_fields)


  timestampe_fields = [
    'errorTime',
  ]
  json2sqlite('alerts', 'item_alert', db, timestampe_fields, True, True)


if __name__ == '__main__':
    main()