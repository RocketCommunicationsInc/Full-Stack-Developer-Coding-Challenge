Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'root#index'

  namespace :api, defaults: { format: :json } do 
    resource :session, only: [:create, :destroy]
    resources :users, only: [:show, :create]
    resources :alerts, only: [:index]
    resources :contacts, only: [:index]
    get 'current_user', to: 'sessions#is_logged_in?'
  end
  
end
