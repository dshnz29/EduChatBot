class Config:
    DEBUG = True
    SECRET_KEY = '0000'  # You can put any random string
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/chatbot'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
