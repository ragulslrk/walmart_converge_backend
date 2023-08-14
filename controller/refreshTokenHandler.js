const  user=require('../model/user')
const tokenHandler=require('../middleware/tokenHandler').newInstance()
const jwt=require('jsonwebtoken')
const config=require('../config/dev.config')

const refreshTokenHandler=async(req,res)=>{
    const  cookie=req.cookies
    console.log(cookie)
    if(!cookie?.refresh_token) return res.sendStatus(401) 
    res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'None', secure: true }); 

    const foundUser=await user.findOne({'security_tokens.refresh_token':cookie.refresh_token}) 
    console.log(foundUser)

    //token reuse detected
    if(!foundUser)
    {   console.log('in hacked user')
        jwt.verify(cookie.refresh_token,config.jwtConfig.REFRESH_TOKEN_SECRET,
            async(err,decoded)=>{
                if(err) return res.sendStatus(403)
                const hackedUser= await user.findOne({username:decoded.username})
                hackedUser.security_tokens=[]
                const result=await foundUser.save()
                console.log(result)

            })
            return res.sendStatus(403)
    }

    // filtering the security arr without the 
    const  newRefreshTokenArr=foundUser.security_tokens.filter((tokens)=>tokens.refresh_token!==cookie.refresh_token)


    jwt.verify(cookie.refresh_token,config.jwtConfig.REFRESH_TOKEN_SECRET,
        async(err,decoded)=>{
            console.log('in not hacked user')
           if(err){
            
            foundUser.security_tokens=[...newRefreshTokenArr]
            const result=await foundUser.save()
            console.log(result)
           }
           if(err || decoded.username!==foundUser.username) return res.sendStatus(403)

           const newToken=tokenHandler.genrateJwt(foundUser.username,foundUser._id)
            console.log(newToken)

            foundUser.security_tokens=[...newRefreshTokenArr,newToken]
            const result=await foundUser.save()

            console.log(result)

            //1) setting cookie in response header with expiry as 1day with refresh headers
            res.cookie('refresh_token', newToken.refresh_token, { httpOnly: true, secure:   true,     sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            //2) sending the access token in  json format
            res.json({access_token:newToken.access_token,role:result.role})

        })

    

  

}


module.exports=refreshTokenHandler
