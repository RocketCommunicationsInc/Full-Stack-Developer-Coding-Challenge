select_alerts = """SELECT * FROM alerts"""

select_contacts = """SELECT * FROM contacts"""

select_user = """SELECT (username, password) from users 
                  WHERE username = %s AND password = %s"""

insert_user = """INSERT INTO users(username, password)
                  VALUES(%s, %s)"""