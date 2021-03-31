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
                errors: @user.errors.full_messages
            }
        end
    end

    def show
        @user = User.find(params[:id])
        if @user
            render json: {
                user: @user
            }
        else
            render json: {
                status: 500,
                errors: ['user not found']
            }
        end
    end

    private

        # verify params
        def user_params
            params.require(:user).permit(:email, :username, :password, :password_confirmation)
        end
end
