class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]
  
    def profile
      user = current_user
      tweets = user.get_tweets
      comments = user.get_comments
     
      render json: { user: UserSerializer.new(current_user), tweets: tweets, comments: comments}, status: :accepted
    end
  
    def create
      user = User.create(user_params)
      if user.valid?
        token = encode_token({ user_id: user.id })
        render json: { user: UserSerializer.new(user), jwt: token }, status: :created
      else
        render json: { error: 'failed to create user' }, status: :not_acceptable
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:username, :password)
    end
  end