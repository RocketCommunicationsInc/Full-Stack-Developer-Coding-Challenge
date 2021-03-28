class ContactSerializer < ActiveModel::Serializer
  attributes :id, :_id, :contactId, :contactStatus, :contactName, :contactGround, :contactSatellite,
  :contactEquipment, :contactState, :contactStep, :contactDetail, :contactBeginTimestamp, :contactEndTimestamp,
  :contactLatitude, :contactLongitude, :contactAzimuth, :contactElevation, :contactResolution, :contactResolutionStatus
end
