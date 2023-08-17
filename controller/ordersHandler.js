const orders=require('../model/orders')
const products=require('../model/products')
const  user=require('../model/user')
const {v4 : uuidv4} = require('uuid')
const axios = require('axios');
const create_orders=async(req,res)=>{
    const {username,userId,role}=req.userInfo
    const {product_id}=req.body
    console.log('in get all products',req.userInfo)
    if(!username||!userId || !role || !product_id) return res.sendStatus(403)
    try{
        const product_data=await products.findOne({product_id})
    const customer_data=await user.findOne({username})
    const order_id= uuidv4()


    const url = `https://api.razorpay.com/v1/payment_links/`;
            const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic cnpwX3Rlc3RfSDNUREM4NjRMbEpmS3c6eUNWYVhwWGFXRTZDVWhOcWFSeDFtMFVw`
                };
            const price=product_data.product_price*100
            const post_data ={
                "amount": price,
                "currency": "INR",
                "accept_partial": false,
                "reference_id":order_id,
                "description": "Payment for Severus",
                "customer": {
                  "name": customer_data.username,
                  "contact":"+916385339037" ,
                  "email": "gokulprasath100702@gmail.com"
                },
                "notify": {
                  "sms": true,
                  "email": true
                },
                "reminder_enable": true,
                "notes": {
                  "policy_name": "orders policy"
                },
                "callback_url": "https://example-callback-url.com/",
                "callback_method": "get"
              };
            console.log(post_data)
           const result=await axios.post(url, post_data, { headers })
           console.log(result.data)
           const new_order=new orders({
            customer_name:customer_data.username,
            product_name:product_data.product_name,
            status:"delivered",
            price:product_data.product_price,
            location:customer_data.location,
            order_id
           })
        const order_result=await new_order.save()
        res.json({payment_url:result.data.short_url})

    }catch(err)
    {
        console.log(err)
        return res.sendStatus(204)
    }
    


}

module.exports={create_orders}