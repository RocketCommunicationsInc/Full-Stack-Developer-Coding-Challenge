class ApplicationController < ActionController::API
    def current_user
      Passenger.find(session[:user_id])
    end
end
