# if Rails.env === 'production' 
#     Rails.application.config.session_store :cookie_store, key: '_rocketman', domain: 'heroku'
#   else
#     Rails.application.config.session_store :cookie_store, key: '_rocketman' 
#   end
Rails.application.config.session_store :cookie_store, {
  :key => '_randirocket',
  :domain => :all,
  :same_site => :none,
  :secure => :true,
  :tld_length => 2
}