#chatbot.py

import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from database import save_message


# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize Gemini LLM
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=GOOGLE_API_KEY)

# Prompt template to encourage a friendly, short reply style
prompt = PromptTemplate.from_template(
    """
You are EduGenie, a friendly career counselor bot helping students choose the right career path.

Keep your responses short, friendly, and ask follow-up questions if needed.
Avoid giving too many options at once unless the user asks for them.
Use a conversational tone.

Current conversation:
{history}
User: {input}
Bot:"""
)

# Add memory to track the conversation
memory = ConversationBufferMemory(return_messages=True)

# Setup chain with memory
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    prompt=prompt,
    verbose=True,
)


def get_bot_response(user_input: str) -> str:
    save_message("user", user_input)  # Log user message
    
    response = conversation.predict(input=user_input).strip()
    
    save_message("bot", response)  # Log bot response
    return response