def simple_ml_response(user_message):
    # Temporary dummy reply (later you can add Gemini API or custom ML model)
    if "engineer" in user_message.lower():
        return "Engineering is a great field! Are you interested in Software, Civil, or Mechanical?"
    elif "business" in user_message.lower():
        return "Business careers are diverse! Would you like management, marketing, or finance?"
    else:
        return "Tell me more about your interests so I can guide you!"
