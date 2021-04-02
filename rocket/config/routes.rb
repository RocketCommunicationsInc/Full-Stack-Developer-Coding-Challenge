Rails.application.routes.draw do
  resources :users
  resources :satellites
  resources :alerts
  resources :sessions

  post '/Login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  get '/main', to: 'users#show'
  post 'user', to: 'users#show'



  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
