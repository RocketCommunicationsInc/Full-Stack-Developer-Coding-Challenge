Rails.application.routes.draw do
    resources :contacts, only: [:index]
    resources :alerts, only: [:index]
end
