const allowedOrgins=require('./allowedOrgins')

const corsOptions={
    origin:(orgin,callback)=>{
        if(allowedOrgins.indexOf(orgin)!==-1 || !orgin){
            callback(null,true)
        }
        else{
            callback(new Error('not allowed domain by cors'))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}
module.exports=corsOptions