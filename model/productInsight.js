const  mongoose=require('mongoose')
const productInsight_schema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
        trim: true,
        
    },
    customer_id:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true, 
        trim: true
    }
   
},{versionKey:false})
const productInsight_model=mongoose.model('productInsights',productInsight_schema)
module.exports=productInsight_model