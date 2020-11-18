class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.text :_id
      t.text :contactId
      t.text :contactStatus
      t.integer :contactName
      t.text :contactGround
      t.text :contactSatellite
      t.text :contactEquipment
      t.text :contactState
      t.text :contactStep
      t.text :contactDetail
      t.integer :contactBeginTimestamp
      t.integer :contactEndTimestamp
      t.float :contactLatitude
      t.float :contactLongitude
      t.float :contactAzimuth
      t.float :contactElevation
      t.text :contactResolution
      t.text :contactResolutionStatus
      t.timestamps
    end
  end
end
