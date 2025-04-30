#main.py

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from chatbot import get_bot_response

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
    try:
        response = get_bot_response(user_input)
        return {"response": response}
    except Exception as e:
        return {"response": f"An error occurred: {str(e)}"}
