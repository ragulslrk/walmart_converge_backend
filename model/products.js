const  mongoose=require('mongoose')
const products_schema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
        trim: true,
        
    },
    product_id:{
        type:String,
        required:true,
        unique:true
    },
    image_url:{
        type:String,
        required:true, 
        trim: true
    },
    is3D:{
        type:String,
        enum:[true,false],
        default:false
    },
    description:{
        type:String,
        required:true, 
        trim: true
    },
    product_price:{
        type:Number,
        required:true, 
    },

    features:{
        type:[
            {
                key:{
                    type:String,
                    required:false
                },
                value:{
                    type:String,
                    required:false
                }
            }
        ]
    }
},{versionKey:false})
const products_model=mongoose.model('products',products_schema)
module.exports=products_model