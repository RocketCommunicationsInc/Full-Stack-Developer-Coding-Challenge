const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

// Set up server
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser);
app.use(
   cors({
      origin: ["http://localhost:3002"],
      credentials: true,
   })
);

// Connect to mongoDB
mongoose.connect(process.env.DB_CONNECT, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}, (err) => {
   if(err) return console.error(err);
   console.log("Connected to MongoDB");
});

// Set up routes
app.use("/auth", require("./routers/userRouter"));
app.use("/api", require("./routers/apiRouter"));