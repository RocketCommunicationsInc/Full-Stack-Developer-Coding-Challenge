class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login(@user)
      render :show
    else
      render json: ['Invalid Username/Password combination!'], status: 401
    end
  end

  def is_logged_in?
    if logged_in? && current_user
      render :show
    else
      render json: { user: { id: nil, username: "" } }
    end
  end

  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: ["You are not signed in."], status: 404
    end
  end
end
