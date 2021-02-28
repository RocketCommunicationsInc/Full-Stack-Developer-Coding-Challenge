const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Set up server
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// Connect to mongoDB
mongoose.connect(process.env.DB_CONNECT, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}, (err) => {
   if(err) return console.error(err);
   console.log("Connected to MongoDB");
});