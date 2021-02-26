const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');

// Register
router.post('/register', async (req, res) => {
   // Validating the data
   const {error} = registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   // Checking if the user already exists
   const nameExist = await User.findOne({name: req.body.name})
   if(nameExist) return res.status(400).send('Username already exists');

   // Hash passwords
   const salt = await bcrypt.gentSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

   // Creating a new user
   const user = new User({
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
router.post('/login', async (req, res) => {
   // Validating the data
   const {error} = loginValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   // Checking if the user exists
   const user = await User.findOne({name: req.body.name})
   if(!user) return res.status(400).send('Username or password is wrong');

   // Checking if the password is correct
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(400).send('Username or password is wrong')

   // Create and assign a token
   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   res.header('auth-token', token).send(token);
})

module.exports = router;