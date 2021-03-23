# import the psycopg2 database adapter for PostgreSQL
from psycopg2 import connect, Error

# import Python's built-in JSON library
import json

# import the JSON library from psycopg2.extras
from psycopg2.extras import Json

# import psycopg2's 'json' using an alias
from psycopg2.extras import json as psycop_json

# import Python's 'sys' library
import sys


table_name = "alerts"

print("\ntable name for JSON data:", table_name)

# open alerts, store as json data
with open('alerts.json') as json_data:

    record_list = json.load(json_data)

print("\nrecords:", record_list)
# should return "<class 'list'>"
print("\nJSON records object type:", type(record_list))

# concatenate to a SQL string
sql_string = 'INSERT INTO {} '.format(table_name)

# if record_list is a list, then get column names from first key
if type(record_list) == list:
    first_record = record_list[0]

    columns = list(first_record.keys())
    print("\ncolumn names:", columns)

# if not, exit out
else:
    print("Needs to be an array of JSON objects")
    sys.exit()

# add () around sql_string to be a valid SQL statement
sql_string += "(" + ", ".join(columns) + ")\nVALUES "

# enumerate over the record
for i, record_dict in enumerate(record_list):

    # iterate over the values of each record dict object
    values = []
    for col_names, val in record_dict.items():

        # Postgres strings must be enclosed with single quotes
        if type(val) == str:
            # escape apostrophies with two single quotations
            val = val.replace("'", "''")
            val = "'" + val + "'"

        values += [str(val)]

    # join the list of values and enclose record in parenthesis
    sql_string += "(" + ', '.join(values) + "),\n"

# remove the last comma and end statement with a semicolon
sql_string = sql_string[:-2] + ";"


try:
    conn = connect(
        dbname="rocket2",
        user="postgres",
        host="localhost",  # !UPDATE TO HEROKU ADDRESS WHEN APPLICABLE,
        password="number13",  # !ENV VAR THIS
        connect_timeout=3
    )
    cur = conn.cursor()
    print("\ncreated cursor obj:", cur)
except (Exception, Error) as err:
    print("\npsycopg2 connect error:", err)
    conn = None
    cur = None

# * Attempt to execute SQL if cur is valid
if cur != None:
    try:
        cur.execute(sql_string)
        conn.commit()

        print('\nfinished INSERT INTO execution')
    except (Exception, Error) as err:
        print("\nexecute_sql() error:", err)
        conn.rollback()
    # close cur and conn
    cur.close()
    conn.close()

print(sql_string)

"""
INSERT INTO alerts("errorId", "errorSeverity", "errorCategory", "errorMessage", "longMessage", "errorTime", "selected", "new", "expanded")
VALUES('6d76630e-e99f-5615-9bd8-331a0fc4b955', 'caution', 'software', 'Red FEP 121 - Offline',
       'Red FEP 121 is offline at 18:37:45', 1542134265725, False, False, False),
('20a96646-abbc-5195-9b20-cff2e99f2ada', 'critical', 'spacecraft', 'USA-168 - Power degradation',
 'USA-168 suffered power degradation at 18:37:54', 1542134274738, False, False, False),
('e7d304c2-17ef-5426-ac70-4431fa580409', 'critical', 'software', 'Black FEP 121 - Degraded',
 'Black FEP 121 is degraded at 18:37:57', 1542134277742, False, False, False),
('47e8c77b-227e-5606-8718-7fafb67f8f8b', 'caution', 'spacecraft', 'USA-150 - Solar panel misalignment',
 'USA-150 experienced solar panel misalignment at 18:38:00', 1542134280747, False, False, False),
('55282589-4b4b-5ac2-b6c9-97b0bf06dfad', 'critical', 'hardware', 'Antenna DGS 1 - Offline',
 'Antenna DGS 1 went offline at 18:38:09', 1542134289757, False, False, False),
('f35ff6e5-ea12-572b-8a27-ecae8b716ae2', 'serious', 'software', 'Red FEP 201 - Degraded',
 'Red FEP 201 is degraded at 18:38:16', 1542134296767, False, False, False),
('5ca28dca-fbd2-5328-9123-7dfa1a5f0ad9', 'caution', 'software', 'Red FEP 301 - Degraded',
 'Red FEP 301 is degraded at 18:38:17', 1542134297768, False, False, False),
('576d94af-206a-5281-a86a-027ee8d13ec3', 'serious', 'hardware', 'Antenna DGS 2 - Offline',
 'Antenna DGS 2 went offline at 18:38:23', 1542134303776, False, False, False),
('de220699-9b65-5eea-ab06-a1eeb5bd5e23', 'serious', 'hardware', 'Workstation 134 - Offline',
 'Workstation 134 is offline at 18:38:24', 1542134304777, False, False, False),
('c9c1060c-03f5-5669-b0d4-c2f89ba9d0e1', 'critical', 'software', 'Black FEP 121 - Offline',
 'Black FEP 121 is offline at 18:38:27', 1542134307782, False, False, False),
('53334558-f2ff-5def-89a4-2e1aacda6e3d', 'critical', 'spacecraft', 'USA-177 - Solar panel misalignment',
 'USA-177 experienced solar panel misalignment at 18:38:32', 1542134312791, False, False, False),
('9615b023-e556-592f-8358-01775dd125f7', 'critical', 'hardware', 'Antenna DGS 2 - Weak signal',
 'Antenna DGS 2 has weak signal at 18:38:37', 1542134317799, False, False, False),
('d0db6011-c352-5829-96ac-c00dd743fc95', 'critical', 'hardware', 'Antenna HTS 1 - NOLOCK',
 'Antenna HTS 1 received NOLOCK at 18:38:38', 1542134318801, False, False, False),
('74321a09-935b-52c5-9b45-3f29e9a75062', 'caution', 'hardware', 'Antenna VTS 2 - Weak signal',
 'Antenna VTS 2 has weak signal at 18:38:43', 1542134323807, False, False, False),
('9d263679-b34d-5ce6-ba0c-88e436774e2c', 'serious', 'hardware', 'Workstation 134 - Out of disk space',
 'Workstation 134 is out of disk space at 18:38:44', 1542134324809, False, False, False),
('35836dba-90da-54e3-914c-f40fa05ccfd4', 'serious', 'hardware', 'Antenna DGS 2 - NOLOCK',
 'Antenna DGS 2 received NOLOCK at 18:38:51', 1542134331818, False, False, False),
('11f05812-a98c-5488-b50f-fd8716514b1e', 'serious', 'spacecraft', 'USA-145 - SARM failure',
 'USA-145 experienced SARM failure at 18:39:02', 1542134342832, False, False, False),
('f97eb85a-34c2-5f64-9e1c-7ae9bbdb50fa', 'serious', 'hardware', 'Workstation 202 - Out of disk space',
 'Workstation 202 is out of disk space at 18:39:05', 1542134345836, False, False, False),
('8c6b253b-fd7e-599b-8682-00f87ac52b25', 'serious', 'hardware', 'Workstation 101 - Memory limit reached',
 'Workstation 101 has reached memory limit at 18:39:12', 1542134352844, False, False, False),
('87035c8d-e5a5-5600-893b-ad243f568054', 'caution', 'software', 'Red FEP 121 - Offline',
 'Red FEP 121 is offline at 18:39:15', 1542134355848, False, False, False),
('8b141bb5-3ee9-5174-bd2b-d11421d74a03', 'serious', 'hardware', 'Antenna HTS 2 - Weak signal',
 'Antenna HTS 2 has weak signal at 18:39:18', 1542134358852, False, False, False),
('c5b35d9c-81b4-5ea8-9ab4-87f71642591d', 'caution', 'hardware', 'Antenna DGS 2 - Offline',
 'Antenna DGS 2 went offline at 18:39:23', 1542134363860, False, False, False),
('a2d52c48-2e7a-56e7-8032-6a3c21474f9d', 'critical', 'software', 'Black FEP 301 - Offline',
 'Black FEP 301 is offline at 18:39:28', 1542134368866, False, False, False),
('0031ccef-c262-5dbe-8e8e-e22229b529e3', 'critical', 'spacecraft', 'USA-180 - Power degradation',
 'USA-180 suffered power degradation at 18:39:34', 1542134374882, False, False, False),
('70f51db6-039d-5794-9c13-8c28d08daea1', 'caution', 'software', 'Red FEP 201 - Offline',
 'Red FEP 201 is offline at 18:39:42', 1542134382891, False, False, False),
('81a6d9cd-86dc-5506-b0b5-75173af7a07f', 'serious', 'hardware', 'Antenna HTS 2 - Offline',
 'Antenna HTS 2 went offline at 18:39:54', 1542134394907, False, False, False),
('730e692e-2698-5a8b-8006-88aa1de4a1cb', 'serious', 'software', 'Red FEP 301 - Offline',
 'Red FEP 301 is offline at 18:40:12', 1542134412929, False, False, False),
('28f8ca0d-0e90-59fa-a482-b6fa4449a704', 'serious', 'spacecraft', 'USA-177 - SARM failure',
 'USA-177 experienced SARM failure at 18:40:15', 1542134415933, False, False, False),
('39179992-b023-599d-8589-b2d4877a7c53', 'serious', 'spacecraft', 'USA-145 - Solar panel misalignment',
 'USA-145 experienced solar panel misalignment at 18:40:17', 1542134417934, False, False, False),
('2eb45565-2c1a-5876-9894-23f7997040ec', 'serious', 'software', 'Black FEP 124 - Degraded',
 'Black FEP 124 is degraded at 18:40:21', 1542134421939, False, False, False),
('d3472160-9d02-5f20-95ee-772c02a6233a', 'critical', 'software', 'Red FEP 124 - Offline',
 'Red FEP 124 is offline at 18:40:27', 1542134427946, False, False, False)
"""
