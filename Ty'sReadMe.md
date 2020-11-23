<!-- @format -->

Backend:
I used production level authentication which requires the user to verify their identity with email verification. I also implemented password reset in case the user forgets their password.

Client: I used React/Redux and used useEffect to fetch the data from the database (I used Postgresql). I also added another component (Chart Pane) that makes the UX really nice.

How to get started:

Backend needs django and djoser installment. 
list of apps is in my ./rocketSystem/settings folder. 
the base directory is from the build folder from the frontend so run npm run build and copy that folder into the backend folder. 
That will get the backend up and running.

For the frontend:
node modules
list of dependencies in json file.

Live version: https://grmdashboard.herokuapp.com/ (I will have to dump data or set up aws for data to render)
