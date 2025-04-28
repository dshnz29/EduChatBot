from flask import Blueprint, request, jsonify
from .services import handle_chat

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = handle_chat(user_message)
    return jsonify({'reply': response})
