const  route=require('express').Router()
const  refreshTokenHandler=require('../controller/refreshTokenHandler')

route.get('/refresh_token',refreshTokenHandler)
module.exports=route