const express=require('express')
const port=8000;
const cors=require("cors")
require('dotenv').config();

const app=express();

const db =require('./config/mongoose')
app.use(cors());
app.use(express.json());


app.use('/',require('./routes'))
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
