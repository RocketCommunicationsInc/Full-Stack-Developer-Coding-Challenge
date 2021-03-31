class AlertsController < ApplicationController

    def create
        Alert.create(alert_params(:alert))
    end

    def index
        alerts = Alerts.all
        render_alerts
    end

    private

        # verify params
        def alert_params
            params.require(:alert).permit(
                :errorId,
                :errorSeverity,
                :errorCategory,
                :errorMessage,
                :longMessage,
                :errorTime,
                :selected,
                :new,
                :expanded
            )
        end

        # format data before rendering
        def render_alerts
            render json: AlertsSerializer.new(alerts).to_serialized_json
        end

end
