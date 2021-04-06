from models import Contacts as ContactsModel, Alerts as AlertsModel
import json

# DB was doubling entries, this is trying to figure out why.
contacts = json.load(open("./contacts.json"))
alerts = json.load(open("./alerts.json"))
count = 0
for i in contacts:
    contact = ContactsModel(
        _id=i["_id"],
        contactId=i["contactId"],
        contactStatus=i["contactStatus"],
        contactName=i["contactName"],
        contactGround=i["contactGround"],
        contactSatellite=i["contactSatellite"],
        contactEquipment=i["contactEquipment"],
        contactState=i["contactState"],
        contactStep=i["contactStep"],
        contactDetail=i["contactDetail"],
        contactBeginTimestamp=i["contactBeginTimestamp"],
        contactEndTimestamp=i["contactEndTimestamp"],
        contactLatitude=i["contactLatitude"],
        contactLongitude=i["contactLongitude"],
        contactAzimuth=i["contactAzimuth"],
        contactElevation=i["contactElevation"],
        contactResolution=i["contactResolution"],
        contactResolutionStatus=i["contactResolutionStatus"]
    ) 
    count = count + 1
    print(contact)
print(count)
print(len(contacts))

a_count = 0
for j in alerts:
    alert = AlertsModel(
        errorId=j["errorId"],
        errorSeverity=j["errorSeverity"],
        errorCategory=j["errorCategory"],
        errorMessage=j["errorMessage"],
        longMessage=j["longMessage"],
        errorTime=j["errorTime"],
        selected=j["selected"],
        new=j["new"],
        expanded=j["expanded"],
    )
    print(alert)
    a_count = a_count+1

print(a_count)
print(len(alerts))


#124 