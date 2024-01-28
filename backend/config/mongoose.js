const mongoose=require('mongoose')

const DB = "mongodb+srv://kushalrao103:u61WuUdnLhDjJK24@cluster0.peevqcr.mongodb.net/?retryWrites=true&w=majority/techlife_solutions";

mongoose.connect(DB);

const db= mongoose.connection;

db.on('error', (err)=>{
    console.log(err.message);
})

db.once('open',()=>{
    console.log("Successfully connected to the database :: MongoDB");
})

module.exports=db;