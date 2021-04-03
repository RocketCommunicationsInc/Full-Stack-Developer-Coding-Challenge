if Rails.env === 'production' 
    #TODO: need to update once deployed
    Rails.application.config.session_store :cookie_store, key: '_your-app-name', domain: 'your-frontend-domain'
else
    Rails.application.config.session_store :cookie_store, key: '_full-stack-developer-coding-challenge' 
end