The React dashboard application rendered by client is designed to provide basic user authentication and authorization to view data returned from the python api.

To start the dev environment for api

cd api
change ENV declaration in **init**.py to 'dev'
may need to change file paths to relative from absolute for all created modules
venv\Scripts\activate
flask run

To start the dev environment for client
cd client
change EVN declarations in useAuthContext.js and useData.js to 'dev'
npm start

Known Bugs and Issues:
Lack of instant validatoin on input fields
Formating of table data for more relavence and readabilty
Implement Remember Me functionality
Styling of tables and forms needs more work
Writting of unit tests
