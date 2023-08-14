const route=require('express').Router()
const tokenHandler=require('../middleware/tokenHandler').newInstance()
const {get_all_products}=require('../controller/productsHandler')
//route to get products
route.get('/products',tokenHandler.verifyJWT,get_all_products)

module.exports=route