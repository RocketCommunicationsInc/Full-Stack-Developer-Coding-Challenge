require('dotenv').config();
const path = require("path");

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const { PORT = 5000 } = process.env;
const { signUp, signIn } = require('./controller/usersController');
// const { usersRouter } = require('./routes/users');

app.use(express.json());
app.use(helmet());



mongoose.connect('mongodb://localhost:27017/rocket', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
app.use('/static', express.static(path.join(__dirname, "public")));

app.post('/signup', signUp);
app.post("/signin", signIn)



app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
