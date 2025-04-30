import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from database import save_message, get_random_welcome_message, get_random_thank_you_message


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

# Function to fetch a welcome message from the database
def get_welcome_message():
    return get_random_welcome_message()

# Function to fetch a thank-you message from the database
def get_thank_you_message():
    return get_random_thank_you_message()

# Function to handle the response generation
def get_bot_response(user_input: str, user_id=None) -> str:
    # Save user input to the database
    save_message("user", user_input, user_id=user_id)
    
    # If it's the start of the conversation (e.g., user input "start"), send a welcome message
    if user_input.strip().lower() == "start":
        welcome_message = get_welcome_message()  # Fetch a welcome message
        save_message("bot", welcome_message, user_id=user_id, sector="welcome")
        return welcome_message

    # If it's the end of the conversation (e.g., user input "bye" or "exit"), send a thank-you message
    if user_input.strip().lower() in ["bye", "exit", "thank you"]:
        thank_you_message = get_thank_you_message()  # Fetch a thank-you message
        save_message("bot", thank_you_message, user_id=user_id, sector="thank_you")
        return thank_you_message

    # For general conversation, use Gemini model for response
    response = conversation.predict(input=user_input).strip()

    # Save bot response to the database
    save_message("bot", response, user_id=user_id)
    
    return response
