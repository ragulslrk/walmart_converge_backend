const route=require('express').Router()
const tokenHandler=require('../middleware/tokenHandler').newInstance()
const {create_orders}=require('../controller/ordersHandler')
//route to create orders
route.post('/orders',tokenHandler.verifyJWT,create_orders)




module.exports=route