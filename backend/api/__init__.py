from datetime import datetime
from datetime import timedelta
from datetime import timezone


from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import set_access_cookies

from .routes import rest_api
from .models import db

def create_app(test_config=None):
    app = Flask(__name__)

    app.config.from_object('api.config.BaseConfig')

    db.init_app(app)
    rest_api.init_app(app)
    jwt = JWTManager(app)
    cors = CORS(app)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        return '404 %s' % path

    # Setup database
    @app.before_first_request
    def initialize_database():
      db.create_all()

    @app.cli.command('drop-imported-data')
    def drop_imported_data():
      from .models import Alerts, Contacts
      Alerts.__table__.drop()
      Contacts.__table__.drop()

    # Using an `after_request` callback, we refresh any token that is within 30
    # minutes of expiring. Change the timedeltas to match the needs of your application.
    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            # Case where there is not a valid JWT. Just return the original respone
            return response

    @app.cli.command('test-table')
    def test_table():
      import json
      from .models import Alerts, Contacts
      with open("alerts.json") as f:
        alerts=json.load(f)
        error_time = datetime.fromtimestamp( int(alerts[0]['errorTime'])/1000)
        print(error_time)

    @app.cli.command('import-data')
    def import_data():
      import json
      from .models import Alerts, Contacts
      db.create_all()

      with open("alerts.json") as f:
        alerts=json.load(f)
        for alert in alerts:
          a = Alerts(
            error_id = alert['errorId'],
            error_severity = alert['errorSeverity'],
            error_category = alert['errorCategory'],
            error_message = alert['errorMessage'],
            long_message = alert['longMessage'] ,
            error_time = datetime.fromtimestamp(int(alert['errorTime'])/1000),
            selected = alert['selected'],
            new = alert['new'],
            expanded = alert['expanded']
          )
          a.save()

      with open("contacts.json") as f:
        contacts=json.load(f)
        for contact in contacts:
          c = Contacts(
            id = contact['_id'],
            contact_id = contact['contactId'],
            contact_status = contact['contactStatus'],
            contact_name = contact['contactName'],
            contact_ground = contact['contactGround'],
            contact_satellite = contact['contactSatellite'],
            contact_equipment = contact['contactEquipment'],
            contact_state = contact['contactState'],
            contact_step = contact['contactStep'],
            contact_detail = contact['contactDetail'],
            contact_begin_timestamp = datetime.fromtimestamp(int(contact['contactBeginTimestamp'])),
            contact_end_timestamp = datetime.fromtimestamp(int(contact['contactEndTimestamp'])),
            contact_latitude = contact['contactLatitude'],
            contact_longitude = contact['contactLongitude'],
            contact_azimuth = contact['contactAzimuth'],
            contact_elevation = contact['contactElevation'],
            contact_resolution = contact['contactResolution'],
            contact_resolution_status = contact['contactResolutionStatus']
          )
          c.save()
    return app

# """
#    Custom responses
# """


# @app.after_request
# def after_request(response):
#   """
#      Sends back a custom error with {"success", "msg"} format
#   """
#   if int(response.status_code) >= 400:
#     response_data = json.loads(response.get_data())
#     if "errors" in response_data:
#       response_data = {
#         "success": False,
#         "msg": list(response_data["errors"].items())[0][1]
#         }
#       response.set_data(json.dumps(response_data))
#     response.headers.add('Content-Type', 'application/json')
#   return response
