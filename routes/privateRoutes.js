const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/loggedIn', verify,  (req, res) => {
   return res.redirect('/main')
})

module.exports = router;