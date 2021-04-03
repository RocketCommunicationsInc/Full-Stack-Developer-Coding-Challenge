class AlertsController < ApplicationController
  def all_alerts
    render json: Alert.all 
  end

  def show
    alert = Alert.find(params[:id])
    render json: alert
  end
end