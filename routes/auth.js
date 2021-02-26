const router = require('express').Router();
const User = require('../model/user');
const {registerValidation} = require('../validation');

router.post('/register', (req, res) => {
   // Validating the data
   const {error} = registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   // Checking if the user already exists
   const nameExist = await User.findOne({name: req.body.name})
   if(nameExist) return res.status(400).send('Username already exists');

   // Creating a new user
   const user = new User({
      name: req.body.name,
      password: req.body.password
   });
   try{
      const savedUser = await user.save();
      res.send(savedUser);
   }catch(err){
      res.status(400).send(err);
   }
});

module.exports = router;