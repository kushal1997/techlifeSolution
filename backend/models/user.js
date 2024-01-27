const mongoose=require('mongoose')

const userShema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    name:{
        
        type:String,
        required:true,
    }
},{
    timestamps: true, 
    collection:'user-data'
}
)

const Users=mongoose.model('UsersList',userShema)

module.exports=Users;