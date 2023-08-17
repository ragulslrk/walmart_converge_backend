const  mongoose=require('mongoose')
const user_schema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
        trim: true,
        
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true, 
        unique: true,
        trim: true
    },
    role:{
        type:String,
        enum:["customer","admin"]
    },
    location:{
        type:String
    },
    security_tokens:{
        type:[
            {
                access_token:{
                    type:String,
                    required:false
                },
                refresh_token:{
                    type:String,
                    required:false
                }
            }
        ]
    }
},{versionKey:false})
const user_model=mongoose.model('users',user_schema)
module.exports=user_model