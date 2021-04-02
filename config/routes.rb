Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get('/users', {to: 'users#all_users'})
  post('/login', {to: 'users#login'})
  get('/logout', {to: 'users#logout'})
  post('/register', {to: 'users#register'})
  get('/contacts', {to: 'contacts#all_contacts'})
  get('/contacts/:id', {to: 'contacts#show'})
  get('/alerts', {to: 'alerts#all_alerts'})
  get('/alerts/:id', {to: 'alerts#show'})
end
