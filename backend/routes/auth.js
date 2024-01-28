const express=require('express')

const router=express.Router();


const authController=require("../controllers/auth_controller")

router.post('/register',authController.register);
router.post('/login',authController.login)


module.exports = router;