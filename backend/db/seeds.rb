# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
    Alert.destroy_all
    Contact.destroy_all
    User.destroy_all

    alerts = JSON.parse(File.read('../alerts.json'))
    alerts.each do |alert|
        Alert.create!(alert)
    end
    contacts = JSON.parse(File.read('../contacts.json'))
    contacts.each do |contact|
        Contact.create!(contact)
    end