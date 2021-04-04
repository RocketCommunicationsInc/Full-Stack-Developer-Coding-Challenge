from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = 'temporarysecretkey'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:train1142@localhost/Rocket-Comms-Challenge-DB'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    login_manager = LoginManager()
    # TODO: Update login view for react frontend
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    migrate = Migrate(app, db)

    from .models.user import User
    from .models.alert import Alert
    from .models.contact import Contact

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    app.debug = True

    return app


if __name__ == '__main__':
    create_app()
    manager.run()
