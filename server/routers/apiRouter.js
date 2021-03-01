const router = require('express').Router();
const auth = require('../middleware/auth');

router.get("/alerts", auth, async (req, res) => {
   try{
      // Place code to pull alerts from database here
   }catch(err){
      console.error(err);
      res.status(400).send()
   }
})

router.get("/contacts", auth, async (req, res) => {
   try{
      // Place code to pull contacts from database here
   }catch(err){
      console.error(err);
      res.status(400).send()
   }
})

module.exports = router;