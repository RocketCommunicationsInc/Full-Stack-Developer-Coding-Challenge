require('dotenv').config();
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const { PORT = 3000 } = process.env;

const { indexRouter } = require('./routes/indexRouter');

app.use(express.json());
app.use(helmet());

app.options('*', cors());
app.use(cors());
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
