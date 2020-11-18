class ContactsController < ApplicationController
    def index
        @contacts = Contact.all
        if @contacts
          render json: {
            contacts: @contacts
          }
        else
          render json: {
            status: 500,
            errors: ['no contacts found']
          }
        end
    end
    
 end