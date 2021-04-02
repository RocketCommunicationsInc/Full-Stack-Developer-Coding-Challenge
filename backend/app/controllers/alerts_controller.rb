class AlertsController < ApplicationController
    def index
        alerts = Alert.all
        render json: alerts
    end
end
