from .db import mysql

def create_user(name, email, age, preferred_field):
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO User (name, email, age, preferred_field) VALUES (%s, %s, %s, %s)",
                (name, email, age, preferred_field))
    mysql.connection.commit()
    cur.close()
