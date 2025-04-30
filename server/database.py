import mysql.connector
import os
from dotenv import load_dotenv
import random

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

def get_random_welcome_message():
    conn = get_connection()
    cursor = conn.cursor()
    
    # Fetch a random welcome message from the welcome_greetings table
    cursor.execute("SELECT message FROM welcome_greetings ORDER BY RAND() LIMIT 1")
    result = cursor.fetchone()
    
    cursor.close()
    conn.close()
    
    if result:
        return result[0]  # Return the message
    else:
        return "Welcome! Let's get started on your career journey!"  # Fallback message if no data found

def get_random_thank_you_message():
    conn = get_connection()
    cursor = conn.cursor()
    
    # Fetch a random thank you message from the thank_you_greetings table
    cursor.execute("SELECT message FROM thank_you_greetings ORDER BY RAND() LIMIT 1")
    result = cursor.fetchone()
    
    cursor.close()
    conn.close()
    
    if result:
        return result[0]  # Return the message
    else:
        return "Thank you for chatting with me! Goodbye!"  # Fallback message if no data found
