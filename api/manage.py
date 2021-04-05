from flask_script import Manager
from flask_migrate import MigrateCommand
from api import create_app as app

manager = Manager(app)

manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
