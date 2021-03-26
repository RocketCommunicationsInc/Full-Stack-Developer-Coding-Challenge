class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :_id
      t.string :contactId
      t.string :contactStatus
      t.integer :contactName
      t.string :contactGround
      t.string :contactSatellite
      t.string :contactEquipment
      t.string :contactState
      t.string :contactStep
      t.text :contactDetail
      t.integer :contactBeginTimestamp
      t.integer :contactEndTimestamp
      t.decimal :contactLatitude
      t.decimal :contactLongitude
      t.decimal :contactAzimuth
      t.decimal :contactElevation
      t.string :contactResolution
      t.string :contactResolutionStatus   
    end
  end
end
