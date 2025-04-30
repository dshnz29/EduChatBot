#database.py

import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

def save_message(role, message, user_id=None, sector=None):
    conn = get_connection()
    cursor = conn.cursor()
    query = "INSERT INTO messages (role, message, user_id) VALUES (%s, %s, %s)"
    cursor.execute(query, (role, message, user_id))
    conn.commit()
    cursor.close()
    conn.close()
