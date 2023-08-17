const route=require('express').Router()
const {get_product_views,get_customer_loation,get_order_count,get_delivery_info}=require('../controller/productInsightHandler')
//route to get product views
route.get('/product_views',get_product_views)

//route to get customer location
route.get('/customer_location',get_customer_loation)

//route to get orders count
route.get('/orders_count',get_order_count)


//route to get delivery info count
route.get('/delivery_count',get_delivery_info)
module.exports=route