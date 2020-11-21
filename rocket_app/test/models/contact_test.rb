# == Schema Information
#
# Table name: contacts
#
#  id                      :bigint           not null, primary key
#  _id                     :string           not null
#  contactId               :string           not null
#  contactStatus           :string           not null
#  contactName             :integer          not null
#  contactGround           :string           not null
#  contactSatellite        :string           not null
#  contactEquipment        :string           not null
#  contactState            :string           not null
#  contactStep             :string           not null
#  contactDetail           :text             not null
#  contactBeginTimestamp   :integer          not null
#  contactEndTimestamp     :integer          not null
#  contactLatitude         :float            not null
#  contactLongitude        :float            not null
#  contactAzimuth          :float            not null
#  contactElevation        :float            not null
#  contactResolution       :string           not null
#  contactResolutionStatus :string           not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#
require 'test_helper'

class ContactTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
