const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');

// Register
const register =  router.post('/register', async (req, res) => {
   // Validating the data
   const {error} = registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   // Checking if the user already exists
   const emailExist = await User.findOne({email: req.body.email})
   if(emailExist) return res.status(400).send('Email already in use');

   // Checking if the two passwords match
   const pass = req.body.password;
   const pass2 = req.body.password2;
   if(pass != pass2) return res.status(400).send('Passwords do not match')

   // Hash passwords
   const salt = await bcrypt.gentSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

   // Creating a new user
   const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword
   });
   try{
      const savedUser = await user.save();
      res.send({user: user._id});
   }catch(err){
      res.status(400).send(err);
   }
});

// Login
const login = router.post('/login', async (req, res) => {
   // Validating the data
   const {error} = loginValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   // Checking if the user exists
   const user = await User.findOne({email: req.body.email})
   if(!user) return res.status(400).send('Email or password is wrong');

   // Checking if the password is correct
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(400).send('Email or password is wrong')

   // Sending user to main page
   res.redirect('/main')
})

module.exports.register = register;
module.exports.login = login;