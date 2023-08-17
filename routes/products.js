const route=require('express').Router()
const tokenHandler=require('../middleware/tokenHandler').newInstance()
const {get_all_products,get_products_byID}=require('../controller/productsHandler')
//route to get products
route.get('/products',tokenHandler.verifyJWT,get_all_products)

//route to get products by id 
route.get('/products/:product_id',tokenHandler.verifyJWT,get_products_byID)


module.exports=route