class UsersSerializer

    def initialize(user_obj)
        @user = user_obj
    end

    def to_serialized_json
        @user.to_json
    end
end