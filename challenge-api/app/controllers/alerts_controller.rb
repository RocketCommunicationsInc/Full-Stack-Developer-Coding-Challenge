class AlertsController < ApplicationController
    def index
        @alerts = Alert.all
        if @alerts
          render json: {
            alerts: @alerts
          }
        else
          render json: {
            status: 500,
            errors: ['no alerts found']
          }
        end
    end
    
end