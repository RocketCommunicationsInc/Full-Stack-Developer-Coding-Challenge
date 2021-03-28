class AlertSerializer < ActiveModel::Serializer
  attributes :id, :errorId, :errorSeverity, :errorCategory, :errorMessage, :longMessage,
  :errorTime, :selected, :new, :expanded
end
