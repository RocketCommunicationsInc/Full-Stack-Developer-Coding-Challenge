# == Schema Information
#
# Table name: alerts
#
#  id            :bigint           not null, primary key
#  errorId       :string           not null
#  errorSeverity :string           not null
#  errorCategory :string           not null
#  errorMessage  :string           not null
#  longMessage   :string           not null
#  errorTime     :bigint           not null
#  selected      :boolean          not null
#  new           :boolean          not null
#  expanded      :boolean          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require 'test_helper'

class AlertTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
