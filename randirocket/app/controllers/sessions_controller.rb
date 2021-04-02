class SessionsController < ApplicationController
    # skip_before_action :authorized, [:new, :create]

    def create
        @user = User.find_by(email: session_params[:email])
    
        if @user && @user.authenticate(session_params[:password])
            login!
            render json: {
                loggedIn: true,
                user: @user
            }
        else
            render json: { 
                status: 401,
                errors: ['no such user', 'verify credentials and try again or signup']
            }
        end
    end
    
    def is_logged_in?
        if logged_in? && current_user
            render json: {
                loggedIn: true,
                user: current_user
            }
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
            params.require(:user).permit(:email, :username, :password, :errors)
        end

end