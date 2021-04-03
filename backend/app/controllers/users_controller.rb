class UsersController < ApplicationController      
      def create
        render json: { message: "hello world"}
        # user = User.new(user_params)
        # if user.save
        #     login!
        
        #     # render json: {
        #     #     status: 200,
        #     #     user: user
        #     # }
        # else 
        #     render json: { message: "hi there"}
        #     # render json: {
        #     #     status: 500,
        #     #     error: 'there was an error'
        #     # }
        # end
      end

    private
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
