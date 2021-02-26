const router = require('express').Router();
const User = require('../model/user');

router.post('/register', (req, res) => {
   const user = new User({
      name: req.body.name,
      password: req.body.password
   });
});

module.exports = router;