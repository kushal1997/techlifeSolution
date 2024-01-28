const express=require('express')

const router=express.Router();

console.log('router loaded')

router.get('/',(req,res)=>{
    res.send("Bcakend is running succesfully")
})

router.use('/api',require('./auth'))
router.use('/api',require('./business'))
module.exports=router
