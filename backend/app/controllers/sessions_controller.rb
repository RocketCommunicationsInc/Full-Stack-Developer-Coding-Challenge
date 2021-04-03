class SessionsController < ApplicationController
    def create
        render json: { message: 'session created'}
        # @user = User.find_by(email: params[:email])

        # # authenticate is from bcrypt
        # if @user && @user.authenticate(params[:password])
        #     login!
        #     render json: {
        #         logged_in: true,
        #         user: @user
        #     }
        # else
        #     render json: { 
        #         status: 401,
        #         error: 'there was an error'
        #     }
        # end
    end
    private
    def session_params
        params.require(:user).permit(:email, :password)
    end
end