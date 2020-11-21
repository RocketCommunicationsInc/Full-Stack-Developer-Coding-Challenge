class Api::AlertsController < ApplicationController
  def index
    @alerts = Alert.all
    render :index
  end
end
