
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if Contact.count == 0
  path = File.join(File.dirname(__FILE__), "./seeds/contacts.json")
  contacts = JSON.parse(File.read(path))
  contacts.each do |contact|
    Contact.create({
          _id: contact["_id"],
          contactId: contact["contactId"],
          contactStatus: contact["contactStatus"],
          contactName: contact["contactName"],
          contactGround: contact["contactGround"],
          contactSatellite: contact["contactSatellite"],
          contactEquipment: contact["contactEquipment"],
          contactState: contact["contactState"],
          contactStep: contact["contactStep"],
          contactDetail: contact["contactDetail"],
          contactBeginTimeStamp: contact["contactBeginTimeStamp"],
          contactEndTimestamp: contact["contactEndTimeStamp"],
          contactLatitude: contact["contactLatitude"],
          contactLongitude: contact["contactLongitude"],
          contactAzimuth: contact["contactAzimuth"],
          contactElevation: contact["contactElevation"],
          contactResolution: contact["contactResolution"],
          contactResolutionStatus: contact["contactResolutionStatus"],
    })
  end
  puts "Contacts are seeded"
end

if Alert.count == 0
  path = File.join(File.dirname(__FILE__), "./seeds/alerts.json")
  alerts = JSON.parse(File.read(path))
  alerts.each do |alert|
    Alert.create({
      errorId: alert["errorId"],
      errorSeverity: alert["errorSeverity"],
      errorCategory: alert["errorCategory"],
      errorMessage: alert["errorMessage"],
      longMessage: alert["longMessage"],
      errorTime: alert["errorTime"],
      selected: alert["selected"],
      new: alert["new"],
      expanded: alert["expanded"],
    })
  end
  puts "Alerts are seeded"
end
