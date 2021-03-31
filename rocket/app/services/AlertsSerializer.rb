class AlertsSerializer

    def initialize(alert_obj)
        @alert = alert_obj
    end

    def to_serialized_json
        @alert.to_json
    end
end