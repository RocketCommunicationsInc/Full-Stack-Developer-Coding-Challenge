const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import Routes
const authRoute = require('./routes/auth');
const mainRoute = require('./routes/privateRoutes');

const PORT = process.env.PORT || 3000;

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('connected to db'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => console.log('Server connected to port' + PORT ));