const mongoose=require('mongoose')

const businessShema= new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      }, 
      name:{
        type:String,
      },
      address:{
        type:String,
      },
      email:{
        type: String,
      },
      website:{
        type: String,
        unique:true,
      },
      contactPerson:{
        type: String,
      },
      phoneNumber:{
        type: String,
      },

})

const Business=mongoose.model('business-list',businessShema)

module.exports=Business;