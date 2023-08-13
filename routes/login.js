const  route=require("express").Router()
const  handleLogin=require('../controller/login')
// route  to login 
route.post('/login',handleLogin)

module.exports=route