const { PORT = 3000 } = process.env;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/rocket', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
