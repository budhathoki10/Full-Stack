
const mongoose= require("mongoose")
const datas= mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
          type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },

})
const userdata= mongoose.model('userdetails',datas)
module.exports=userdata