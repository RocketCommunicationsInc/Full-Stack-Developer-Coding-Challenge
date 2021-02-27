import psycopg2

# db = 

def create_tables():
    commands = (
        """CREATE TABLE alerts (
            errorId VARCHAR(255) PRIMARY KEY,
            errorSeverity VARCHAR(255) NOT NULL,
            errorCategory VARCHAR(255) NOT NULL,
            errorMessage VARCHAR(255) NOT NULL,
            longMessage TEXT NOT NULL,
            errorTime BIGINT NOT NULL,
            selected BOOLEAN NOT NULL,
            new BOOLEAN NOT NULL,
            expanded BOOLEAN NOT NULL
        )""",
        """CREATE TABLE contacts (
            _id VARCHAR(255) PRIMARY KEY,
            contactId VARCHAR(255) NOT NULL,
            contactStatus VARCHAR(255) NOT NULL,
            contactName INTEGER NOT NULL,
            contactGround VARCHAR(255) NOT NULL,
            contactSatellite VARCHAR(255) NOT NULL,
            contactEquipment VARCHAR(255) NOT NULL,
            contactState VARCHAR(255) NOT NULL,
            contactStep VARCHAR(255) NOT NULL,
            contactDetail TEXT NOT NULL,
            contactBeginTimestamp BIGINT NOT NULL,
            contactEndTimestamp BIGINT NOT NULL,
            contactLatitude VARCHAR(255) NOT NULL,
            contactLongitude VARCHAR(255) NOT NULL,
            contactAzimuth VARCHAR(255) NOT NULL,
            contactElevation VARCHAR(255) NOT NULL,
            contactResolution VARCHAR(255) NOT NULL,
            contactResolutionStatus VARCHAR(255) NOT NULL
        )""",
        """CREATE TABLE users (
                username VARCHAR(20) PRIMARY KEY NOT NULL,
                password VARCHAR(50) NOT NULL
        )""")
    conn = None
    try:
        conn = psycopg2.connect(db, sslmode="require")
        cur = conn.cursor()
        
        for command in commands:
            cur.execute(command)

        conn.commit()
        cur.close()
        conn.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


if __name__ == '__main__':
    create_tables()