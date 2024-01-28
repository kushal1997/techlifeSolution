const mongoose=require('mongoose')
require('dotenv').config();


const DB = process.env.DB_CONNECTION_STRING;

mongoose.connect(DB);

const db= mongoose.connection;

db.on('error', (err)=>{
    console.log(err.message);
})

db.once('open',()=>{
    console.log("Successfully connected to the database :: MongoDB");
})

module.exports=db;