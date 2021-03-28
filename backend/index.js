require('dotenv').config();
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const { PORT = 5000 } = process.env;
const { signUp, signIn } = require('./controller/usersController');

app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/rocket', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.options('*', cors());
app.use(cors());
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.post('/signup', signUp);
app.post('/signin', signIn);

const { getContacts } = require('./controller/contactsController');
app.get('/contacts', getContacts);

const { getAlerts } = require('./controller/alertsController');
app.get('/alerts', getAlerts);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
