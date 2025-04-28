from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object('app.config.Config')
    
    db.init_app(app)

    from app.routes.chatbot_routes import chatbot_bp
    app.register_blueprint(chatbot_bp, url_prefix='/api')

    return app
