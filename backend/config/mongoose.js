const mongoose=require('mongoose')

const DB = "mongodb+srv://kushalrao103:id7Uu4VSOQMOEcyb@cluster0.ur4d3vt.mongodb.net/techlife_solutions";
// id7Uu4VSOQMOEcyb
mongoose.connect(DB);

const db= mongoose.connection;

db.on('error', (err)=>{
    console.log(err.message);
})

db.once('open',()=>{
    console.log("Successfully connected to the database :: MongoDB");
})

module.exports=db;