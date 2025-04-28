from flask import Blueprint, request, jsonify
from app.models.message import Message
from app import db

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message')

    if not message:
        return jsonify({'error': 'No message provided'}), 400

    # Save user message
    user_msg = Message(text=message, sender='user')
    db.session.add(user_msg)
    db.session.commit()

    # Bot response logic (simple now)
    bot_reply = "Hello! How can I assist you today?"

    # Save bot reply
    bot_msg = Message(text=bot_reply, sender='bot')
    db.session.add(bot_msg)
    db.session.commit()

    return jsonify({'reply': bot_reply})
