from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from chatbot import get_bot_response
from database import get_random_welcome_message, get_random_thank_you_message

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_input = data.get("message", "")
    user_id = data.get("user_id")
    
    # Check if this is the start of the conversation
    if not user_input:
        # If no message is provided, send a random welcome message
        welcome_message = get_random_welcome_message()
        return {"response": welcome_message}

    try:
        # Get the bot's response
        response = get_bot_response(user_input, user_id=user_id)
        
        # If the conversation is ending or a specific end condition is met
        if "end" in user_input.lower() or "thank you" in user_input.lower():
            thank_you_message = get_random_thank_you_message()
            return {"response": f"{response} {thank_you_message}"}
        
        return {"response": response}
    except Exception as e:
        return {"response": f"An error occurred: {str(e)}"}
