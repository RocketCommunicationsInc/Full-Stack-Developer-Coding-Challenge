const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post("/", async (req, res) => {
   try{
      const {email, password, passwordVerify} = req.body;

      // Validation
      // Checks to see if the user gave all the required info
      if(!email || !password || !passwordVerify)
         return res
            .status(400)
            .json({errorMessage: "Email or password missing"});
      // Checks to see if the user entered a password longer than 6 characters
      if(password.length < 6)
         return res
            .status(400)
            .json({errorMessage: "Please enter a longer password"});
      // Checks to see if the password and the passwordVerify match
      if(password !== passwordVerify)
         return res
            .status(400)
            .json({errorMessage: "Please enter the same password twice"});
      // Checks to see if there is already an account with the entered email
      const existingUser = await User.findOne({email: email});
      if(existingUser)
         return res
            .status(400)
            .json({errorMessage: "An account with that email already exists"});

      // Hash the password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      
      // Save a new account to database
      const newUser = new User({
         email: email, 
         passwordHash: passwordHash
      });
      const savedUser = newUser.save();

      // Sign the token
      const token = jwt.sign({user: savedUser._id},process.env.JWT_SECRET);

      // Put the token into a cookie
      res.cookie(
         "token", 
         token, 
         {httpOnly: true}
      ).send();

   }catch(err){
      console.error(err);
      res.status(500).send();
   }
});

// Login
router.post("/login", async (req, res) => {
   try{
      const {email, password} = req.body;

      // Checks to see if the user gave all the required info
      if(!email || !password)
         return res
            .status(400)
            .json({errorMessage: "Email or password missing"});

      // Checks to see if the given email matches one in the database
      const existingUser = await User.findOne({email: email});
      if(!existingUser)
         return res
            .status(401)
            .json({errorMessage: "Wrong email or password"})

      // Checks to see if the password matches the one associated with the given user
      const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
      if(!passwordCorrect)
         return res
            .status(401)
            .json({errorMessage: "Wrong email or password"})

      // Sign the token
      const token = jwt.sign({user: existingUser._id},process.env.JWT_SECRET);

      // Put the token into a cookie
      res.cookie(
         "token", 
         token, 
         {httpOnly: true}
      ).send();

   }catch(err){
      console.error(err);
      res.status(500).send();
   }
})

module.exports = router;