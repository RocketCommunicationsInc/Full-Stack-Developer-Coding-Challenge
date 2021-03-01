import psycopg2
import os 

db = os.getenv('DATABASE_URL')

def do_query(query, params):
  conn = psycopg2.connect(db, sslmode="require")
  cur = conn.cursor()

  if (params != None):
    cur.execute(query, params)
  else:
    cur.execute(query)

  return cur.fetchall()
  # conn.commit()
  # cur.close()
  # con
def do_insert(query, params):
  conn = psycopg2.connect(db, sslmode="require")
  cur = conn.cursor()

  cur.execute(query, params)

  conn.commit()