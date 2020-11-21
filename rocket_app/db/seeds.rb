# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Contact.destroy_all
Alert.destroy_all

User.create!({ username: "test", password: "hunter2" })

path = File.join(File.dirname(__FILE__), "./data/contacts.json")
contacts = JSON.parse(File.read(path))
contacts.each do |contact|
  Contact.create!(contact)
end
puts "Contacts are seeded!"

path = File.join(File.dirname(__FILE__), "./data/alerts.json")
alerts = JSON.parse(File.read(path))
alerts.each do |alert|
  Alert.create!(alert)
end
puts "Alerts are seeded!"