const  user=require('../model/user')
const tokenHandler=require('../middleware/tokenHandler').newInstance()

//controller for handling 
const login=async(req,res)=>{
    console.log('in login',req.body)
    const{ username,password}=req.body

    if(username && password){
        
        const foundUser=await user.findOne({username})
        if(foundUser){
            //compare password
            if(foundUser.password===password){
                console.log(foundUser)
                const cookie=req.cookies
                console.log(cookie)
                
                let securityTokenArray=foundUser.security_tokens

                //checking  if cookie refresh token is exist in db 
                
                if(cookie?.refresh_token){
                console.log('in cookie clearing block')
                    const isFound=securityTokenArray.find((token)=>{
                            return token.refresh_token.indexOf(cookie.refresh_token)>-1})
                    
                    if(isFound){
                            console.log('isfound')
                            //removing the already exist token 
                            securityTokenArray=securityTokenArray.filter(token=>{
                                return token.refresh_token!==cookie.refresh_token
                            })


                    }else{

                            //this condition exist if token is stolen  so lets clear all the security token 

                            securityTokenArray=[]
                        }
                    res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'None', secure: true });
                    
                }

                console.log(securityTokenArray)

                const newToken=tokenHandler.genrateJwt(foundUser.username,foundUser._id,foundUser.role)
                console.log(newToken)

                foundUser.security_tokens=[...securityTokenArray,newToken]
                const result=await foundUser.save()

                console.log(result)

                //1) setting cookie in response header with expiry as 1day with refresh headers
                res.cookie('refresh_token', newToken.refresh_token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            
                //2) sending the access token in  json format
                res.json({access_token:newToken.access_token,role:result.role})
            }
            else{
                res.status(400).json({'msg':'Incorrect Password'})
            }
        }
        else{
            console.log('in error2')
        res.status(400).json({'msg':'Incorrect Username'})

        }
    }
    else{
        console.log('in error')
        res.status(400).json({'msg':'Username and Password is required'})
    }

}


module.exports=login