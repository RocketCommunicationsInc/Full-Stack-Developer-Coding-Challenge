class SessionsController < ApplicationController
    # skip_before_action :authorized, [:new, :create]

    def create
        @users_data = User.find_by(username: session_params[:username])
    
        if @users_data && @users_data.authenticate(session_params[:password])
            login!
            render_users
        else
            render json: { 
                status: 401,
                errors: 'verify credentials and try again or signup'
            }
        end
    end
    
    def is_logged_in?
        if current_user
            render_users
        else
            render json: {
                loggedIn: false,
                errors: 'no such user'
            }
        end
    end

    def destroy
        logout!
        render json: {
            status: 200,
            loggedIn: false
        }
    end

    private
        def session_params
            params.require(:user).permit(:username, :password, :errors)
        end

        # format data before rendering via serializer
        def render_users
            render json: UsersSerializer.new(@users_data).to_serialized_json
        end
end