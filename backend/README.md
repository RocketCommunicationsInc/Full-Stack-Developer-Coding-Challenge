## Rocket Communications Code Challenge

Live Link: https://awong-rocket.herokuapp.com/

Endpoints:

     /alerts - list of all the alerts
     /contacts - list of all the contacts

This is the backend portion of the coding challenge. It was built using Node.js.

The data was stored on a MongoDB database. 

User sign in/sign up data is sent to the database to check for existing users. Upon user creation, passwords are encrypted with bcrypt before being stored on the database.

Due to my work schedule and time limitations, I was not able to implement some of the features I would've liked to. One feature would be a tie-in to the frontend token authentication to check the payload and determine who the user is. I would also like to have optimized the errors returned in responses and write re-useable blocks.
