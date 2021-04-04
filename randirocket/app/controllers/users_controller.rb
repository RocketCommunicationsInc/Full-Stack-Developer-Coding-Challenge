class UsersController < ApplicationController
    
    def index
        @users_data = User.all
        render_users
     end

    def create
        @users_data = User.new(user_params)
        if @users_data.save
            render_users
        else 
            render json: {
                status: 500,
                errors: @users_data.errors.full_messages
            }
        end
    end

    def show
        @users_data = User.find_by(username: user_params[:username])
        if @users_data
            render_users
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
            params.require(:user).permit(:id, :username, :password, :errors)
        end

        # format data before rendering via serializer
        def render_users
            render json: UsersSerializer.new(@users_data).to_serialized_json
        end
end
