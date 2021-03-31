class CreateSatellites < ActiveRecord::Migration[6.1]
  def change
    create_table :satellites do |t|
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
      t.bigint :contactBeginTimestamp
      t.bigint :contactEndTimestamp
      t.decimal :contactLatitude
      t.decimal :contactLongitude
      t.decimal :contactAzimuth
      t.decimal :contactElevation
      t.text :contactResolution
      t.text :contactResolutionStatus

    end
  end
end
