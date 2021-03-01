const router = require('express').Router();

router.get("/alerts", async (req, res) => {
   try{
      // Place code to pull alerts from database here
   }catch(err){
      console.error(err);
      res.status(400).send()
   }
})

router.get("/contacts", async (req, res) => {
   try{
      // Place code to pull contacts from database here
   }catch(err){
      console.error(err);
      res.status(400).send()
   }
})

module.exports = router;