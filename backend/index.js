require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controller/usersController');
// const { usersRouter } = require('./routes/users');

app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/rocket', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.post('/signup', createUser);
app.post("/signin", login)



app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
