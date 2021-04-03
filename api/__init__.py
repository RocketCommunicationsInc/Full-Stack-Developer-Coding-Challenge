from flask import Flask


def create_app():
    app = Flask(__name__)

    app.debug = True

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
