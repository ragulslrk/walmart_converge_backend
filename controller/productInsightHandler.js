const  productInsights=require('../model/productInsight')
const orders=require('../model/orders')


//this function is  used to get barchart data for product view 
const  get_product_views=async(req,res)=>{
    try{
        const product_views=await productInsights.aggregate([
            {$group:{_id:"$product_name",product_view:{$sum:1}}},
            {$project:{_id:1,product_view:1}}
        ])
        console.log(product_views)
        res.send(product_views)
    }catch(err)
    {
        console.log(err)
        return res.sendStatus(204)
    }
 
    
}

//this function  is  used to get customers loacations 
const get_customer_loation=async(req,res)=>{
    try{
        const customer_location=await productInsights.aggregate([
            {$group:{_id:"$location",value:{$sum:1}}},{ 
                $addFields: { id: "$_id" }
            },
            {$project:{
                id:1,
                value:1
            }}
        ])
        console.log(customer_location)
        res.send(customer_location)
    }catch(err)
    {
        console.log(err)
        return res.sendStatus(204)
    }
   

}

//get order count 
const get_order_count=async(req,res)=>{
    try{
        const orders_count=await orders.find({}).count()
        console.log(orders_count,'in orders count')
        res.json({orders_count})
    }catch(err)
    {
        console.log(err)
        return res.sendStatus(204)
    }


}

//get delivered vs not delivered count
const get_delivery_info=async(req,res)=>{
    try{
        const delivery_info=await orders.aggregate([
            {$group:{_id:"$status",count:{$sum:1}}},
           
            
            {$project:{
                _id:1,
                count:1
            }}
        ])
        console.log(delivery_info)
        res.send(delivery_info)
    }catch(err)
    {
        console.log(err)
        return res.sendStatus(204)
    }
   

}
module.exports={get_product_views,get_customer_loation,get_order_count,get_delivery_info}