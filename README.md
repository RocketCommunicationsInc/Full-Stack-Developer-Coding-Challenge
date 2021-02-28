## Architecture
* The app is split into two codebases, (1) A PHP API written in Laravel (2) A Vue SPA
* The root of the app is the API. The Vue SPA is in the /frontend directory. The Vue app is an entirely standalone app, this folder structure is just to make development easier (taken from [Evan You](https://github.com/yyx990803/laravel-vue-cli-3)) 
* Authentication is done via [Laravel Sanctum](https://laravel.com/docs/8.x/sanctum#spa-authentication) using cookie based session authentication, rather than JWT. This gives us added CSRF + XSS protection and solves the problem of having to store tokens insecurely like in LocalStorage. However, tokens can easily be added if there were ever to be a mobile app component to this. 

## Running Locally
* `composer install`
* `cp .env.example .env`
* `php artisan migrate --seed`
* `cd frontend && npm run build`

## TODOS
* I don't like how the column width changes when you click sort on a column. The caret icon changes the width and it feels janky.

### Caret Icon
* The caret icon used in the Tree component is also used in the Table component to indicate the sort state of a column. 
  This icon doesn't appear to be included in the icon sprite svg. You may want to consider adding it to the 
  icon svg. The [documentation](https://astrouxds.com/components/icons-and-symbols) has Caret as an item under Component Icons.
  
### Form Input
* If the field is required, the default state shows the red warning icon and highlighted border. 
* I was able to hack around it by manually setting the required attribute in the component. 

### Rux Button
* Might want to add 'type' as a prop to the rux-button component. 
I wasn't able to change the type to 'submit' so I just made my own 
  Vue component using the Astro css. The use case is that instead of having an 
  event listener on the button itself, I like to put one on the form submit event instead.
  This gives me basic HTML5 input validation for free. But I understand that may not 
  be an intended use case. 
