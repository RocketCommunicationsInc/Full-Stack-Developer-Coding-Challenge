alerts_path = File.join Rails.root, '/lib/seeds/alerts.json'
alert_records = JSON.parse(File.read(alerts_path))

alert_records.each do |record|
    Alert.create(
        errorId: record["errorId"],
        errorSeverity: record["errorSeverity"],
        errorCategory: record["errorCategory"],
        errorMessage: record["errorMessage"],
        longMessage: record["longMessage"],
        errorTime:  record["errorTime"],
        selected: record["selected"],
        new: record["new"],
        expanded: record["expanded"]
    )
end

contacts_path = File.join Rails.root, '/lib/seeds/contacts.json'
contact_records = JSON.parse(File.read(contacts_path))

contact_records.each do |record|
    Contact.create( 
        _id: record["_id"],
        contactId: record["contactId"],
        contactStatus: record["contactStatus"],
        contactName: record["contactName"],
        contactGround: record["contactGround"],
        contactSatellite: record["contactSatellite"],
        contactEquipment: record["contactEquipment"],
        contactState: record["contactState"],
        contactStep: record["contactStep"],
        contactDetail: record["contactDetail"],
        contactBeginTimestamp: record["contactBeginTimestamp"],
        contactEndTimestamp: record["contactEndTimestamp"],
        contactLatitude: record["contactLatitude"],
        contactLongitude: record["contactLongitude"],
        contactAzimuth: record["contactAzimuth"],
        contactElevation: record["contactElevation"],
        contactResolution: record["contactResolution"],
        contactResolutionStatus: record["contactResolutionStatus"],
    )
end

