const express=require('express')

const router=express.Router();

const businessController =require('../controllers/business_controller')

console.log("touched businessController")

router.post('/addDetails',businessController.addDetails);
router.get('/getDetails/:userId',businessController.getDetails)

module.exports = router;