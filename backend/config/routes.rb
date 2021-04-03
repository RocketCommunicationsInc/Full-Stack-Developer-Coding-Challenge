Rails.application.routes.draw do
    scope '/api' do
        resources :contacts, only: [:index]
        resources :alerts, only: [:index]
        resources :users, only: [:create]

        post '/login', to: 'sessions#create'
        delete '/logout', to: 'sessions#destroy'
        get '/logged_in', to: 'sessions#is_logged_in?'
    end
end
