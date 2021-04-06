# GRM DASHBOARD - ROCKET COMMUNICATIONS FULL_STACK DEVELOPER CHALLENGE

The React dashboard application rendered by client is designed to provide basic user authentication and authorization to view data returned from the python api. The data returned is a collection of alerts and satallite contact data presented in tabular format.

## Dev Environemnt

http://localhost:5000

### API

Make the following code changes

- change ENV declaration in **init**.py to 'dev'
- may need to change file paths to relative from absolute for all created modules

Run the following terminal commands

- cd api
- venv\Scripts\activate
- flask run

### Client

http://localhose:3000
Make the following code changes

- change EVN declarations in useAuthContext.js and useData.js to 'dev'

Run the following terminal commands

- cd client
- npm start

## Production Environment

### API

https://rocket-comms-challenge-api.herokuapp.com/

### Client

https://rocket-comms-challenge-client.herokuapp.com

## Known Bugs and issues for further development:

- Lack of instant validatoin on input fields
- Formating of table data for more relavence and readabilty
- Implement Remember Me functionality
- Styling of tables and forms needs more work
- Writting of unit tests
- Write documentation for the use of the api using templates returned by python
- Incorporate Sign Up form and Log In form to same route
- have error notification go disappear on user interaction
