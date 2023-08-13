const jwt=require('jsonwebtoken')
const config=require('../config/dev.config')

function  tokenHandler(){}

//genrating jwt
tokenHandler.prototype.genrateJwt=function(username,userId,role){

    const payload={
        username,
        userId,
        role
    }
    const access_token=jwt.sign(payload,
        config.jwtConfig.ACCESS_TOKEN_SECRET,
        { expiresIn:config.jwtConfig.ACCESS_TOKEN_EXPIRY  })

    const refresh_token=jwt.sign(payload,
        config.jwtConfig.REFRESH_TOKEN_SECRET,
        { expiresIn:config.jwtConfig.REFRESH_TOKEN_EXPIRY  })

        return {access_token,refresh_token}
}

//verify the token 
tokenHandler.prototype.verifyJWT=async function(req,res,next){

    const  authHeaders=req.headers.authorization || req.headers.Authorization
    console.log(authHeaders)
    if(!authHeaders?.startsWith('Bearer')) return res.sendStatus(401)

    const access_token=authHeaders.split(' ')[1]
    try{
         
        const userInfo=await jwt.verify(access_token,config.jwtConfig.ACCESS_TOKEN_SECRET)
        console.log(userInfo)
        req.userInfo=userInfo
        next()

    }
    catch(err){
        console.log(err)
        return  res.sendStatus(403)//invalid token or expired
    } 

}


module.exports.newInstance=()=>{
    return new tokenHandler()
}