class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string(:_id)
      t.string(:contactId)
      t.string(:contactStatus)
      t.integer(:contactName)
      t.string(:contactGround)
      t.string(:contactSatellite)
      t.string(:contactEquipment)
      t.string(:contactState)
      t.string(:contactStep)
      t.string(:contactDetail)
      t.integer(:contactBeginTimeStamp)
      t.integer(:contactEndTimestamp)
      t.integer(:contactLatitude)
      t.integer(:contactLongitude)
      t.integer(:contactAzimuth)
      t.integer(:contactElevation)
      t.integer(:contactResolution)
      t.integer(:contactResolutionStatus)
    end
  end
end
