Rails.application.routes.draw do
    namespace :api do
        namespace :v1 do
          resources :contacts, only: [:index]
          resources :alerts, only: [:index]
        end
    end
end
