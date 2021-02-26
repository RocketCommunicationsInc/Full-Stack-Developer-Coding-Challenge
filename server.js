const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import Routes
const authRoute = requre('./routes/auth');
const mainRoute = require('./routes/privateRoutes');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('connected to db'));

// Middlewares
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/loggedIn', mainRoute);

app.listen(3000, () => console.log('Server up and running'));