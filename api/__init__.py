from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_cors import CORS
import os

db = SQLAlchemy()
migrate = Migrate()

ENV = 'prod'


def create_app():
    app = Flask(__name__, static_folder='./build', static_url_path='/')
    CORS(app, supports_credentials=True)

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ.get(
        "SQLALCHEMY_TRACK_MODIFICATIONS")
    # Uncomment config lines below if brower giving SameSite Cookie warning
    app.config['REMEMBER_COOKIE_SECURE'] = 'Secure'
    app.config['SESSION_COOKIE_SECURE'] = True

    if ENV == 'dev':
        app.secret_key = os.urandom(24)
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
            "DEV_DATABASE_URL")
    if ENV == 'prod':
        app.debug = False
        app.secret_key = os.urandom(24)
        app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://zlhvevdtrsflbl:8baef261e3ebb0882a58755dec7aeadb821430781391f36c0d05cba08b80ae89@ec2-54-224-120-186.compute-1.amazonaws.com:5432/d7j3mhl4rgivco"

    db.init_app(app)
    migrate.init_app(app, db)

    login_manager = LoginManager()

    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from models.user import User
    from models.alert import Alert
    from models.contact import Contact

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    from auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run()
