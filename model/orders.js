const  mongoose=require('mongoose')
const order_schema=new mongoose.Schema({
    customer_name:{
        type:String,
        required:true,
        trim: true,
        
    },
    product_name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true, 
        trim: true
    },
    order_id:{
        type:String,
        required:true, 
        unique: true,
        trim: true
    },
    status:{
        type:String,
        enum:["delivered","not_delivered"]
    },
    location:{
        type:String
    }
},{versionKey:false})
const order_model=mongoose.model('orders',order_schema)
module.exports=order_model