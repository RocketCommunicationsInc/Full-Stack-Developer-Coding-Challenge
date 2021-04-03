class UsersController < ApplicationController

  def login
    user = User.find_by({
      username: params[:username]
    })

    if user != nil && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: {error: true, message: 'Invalid username/password'}
    end
  end

  def logout
    reset_session
  end

  def register
    user = User.create({
        username: params[:username],
        password: params[:password] 
    })
  end


end