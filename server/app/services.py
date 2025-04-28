from .utils import simple_ml_response

def handle_chat(user_message):
    reply = simple_ml_response(user_message)
    return reply
