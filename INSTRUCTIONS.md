The React dashboard application rendered by client is designed to provide basic user authentication and authorization to view data returned from the python api.

To start the dev environment for api
http://localhost:5000
cd api
change ENV declaration in **init**.py to 'dev'
may need to change file paths to relative from absolute for all created modules
venv\Scripts\activate
flask run

To start the dev environment for client
http://localhose:3000
cd client
change EVN declarations in useAuthContext.js and useData.js to 'dev'
npm start

Production Environment
API
https://rocket-comms-challenge-api.herokuapp.com/

Client
https://rocket-comms-challenge-client.herokuapp.com

Known Bugs and Issues:
Lack of instant validatoin on input fields
Formating of table data for more relavence and readabilty
Implement Remember Me functionality
Styling of tables and forms needs more work
Writting of unit tests
