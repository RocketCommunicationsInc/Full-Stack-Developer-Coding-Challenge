const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../validation');

router.post('/register', (req, res) => {
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
      res.send(savedUser);
   }catch(err){
      res.status(400).send(err);
   }
});

module.exports = router;