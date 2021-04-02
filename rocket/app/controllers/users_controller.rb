class UsersController < ApplicationController
    

    def create
        @user = User.new(user_params)
        if @user.save
            login!
            render json: {
                status: :created,
                user: @user
            }
        else 
            render json: {
                status: 500,
                error: @user.errors.full_messages
            }
        end
    end

    def show
        @user = User.find_by(email: user_params[:email])
        if @user
            render json: {
                user: @user
            }
        else
            render json: {
                status: 500,
                error: ['user not found']
            }
        end
    end

    private

        # verify params
        def user_params
            params.require(:user).permit(:id, :email, :username, :password, :error)
        end
end
