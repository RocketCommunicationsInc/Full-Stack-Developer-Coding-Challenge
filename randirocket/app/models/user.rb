class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, on: :create
    validates :username, uniqueness: true
    validates :username, length: { minimum: 4 }
    # validates :email, presence: true, on: :create
    # validates :email, uniqueness: true
    validates :password, confirmation: { case_sensitive: true }
    validates :password, presence: true, on: :create

    # validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

end
