class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :_id, null: false
      t.string :contactId, null: false
      t.string :contactStatus, null: false
      t.integer :contactName, null: false
      t.string :contactGround, null: false
      t.string :contactSatellite, null: false
      t.string :contactEquipment, null: false
      t.string :contactState, null: false
      t.string :contactStep, null: false
      t.text :contactDetail, null: false
      t.integer :contactBeginTimestamp, null: false
      t.integer :contactEndTimestamp, null: false
      t.float :contactLatitude, null: false
      t.float :contactLongitude, null: false
      t.float :contactAzimuth, null: false
      t.float :contactElevation, null: false
      t.string :contactResolution, null: false
      t.string :contactResolutionStatus, null: false

      t.timestamps
    end
  end
end
