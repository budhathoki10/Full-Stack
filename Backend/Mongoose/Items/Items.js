const mongoose= require("mongoose")
const itemsmongoose= mongoose.Schema({
    product: [{
        items:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
     type:String,
        require:true
    },
    stock:{
        type:String,
        require:true
    }
        
}]
}) 
const item= mongoose.model("itemdetails",itemsmongoose)
module.exports= item