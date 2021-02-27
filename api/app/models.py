alert = [
  "errorId",
  "errorSeverity",
  "errorCategory",
  "errorMessage",
  "longMessage",
  "errorTime",
  "selected",
  "new",
  "expanded"
]

contact = [
  "_id",
  "contactId",
  "contactStatus",
  "contactName",
  "contactGround",
  "contactSatellite",
  "contactEquipment",
  "contactState",
  "contactStep",
  "contactDetail",
  "contactBeginTimestamp",
  "contactEndTimestamp",
  "contactLatitude",
  "contactLongitude",
  "contactAzimuth",
  "contactElevation",
  "contactResolution",
  "contactResolutionStatus"
]

user = [
  "username",
  "password"
]

def map_values_to_dict(list, values):
  return dict((list[index], val) for index, val in enumerate(values))

def alert_model(valueList):
  return map_values_to_dict(alert, valueList)

def contact_model(valueList):
  return map_values_to_dict(contact, valueList)

def user_model(valueList):
  return map_values_to_dict(user, valueList)



