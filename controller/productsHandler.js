const products=require('../model/products')
const  productInsights=require('../model/productInsight')
const user=require('../model/user')
//get all products
const get_all_products=async(req,res)=>{
    const {username,userId,role}=req.userInfo
    console.log('in get all products',req.userInfo)
    if(!username||!userId || !role) return res.sendStatus(403)

    console.log('in all products')
    try{
        const product_data=await products.find({})
     res.json({
        product_data,
        role
        })
    }
    catch(err)
    {
        console.log(err)
        return res.sendStatus(204)

    }
    

}

//get products by productID 
const get_products_byID=async(req,res)=>{
    const {username,userId,role}=req.userInfo
    console.log('in get  products by id',req.userInfo)
    const product_id=req.params?.product_id
    if(!username||!userId || !role || !product_id) return res.sendStatus(403)
    try{
        const product_data=await products.findOne({product_id})
        //  if(!product_data) return res.sendStatus(204)
        if(role==="customer"){
            const user_data=await user.findOne({_id:userId},{location:1})
            console.log(user_data,'in customer ')
            const new_productInsight=new productInsights({
                customer_id:userId,
                product_name:product_data.product_name,
                location:user_data.location

            })
            const result=await new_productInsight.save()
            console.log(result)
        }
        res.json({
            product_data,
            role

    })

    }catch(err){
        console.log(err)
        return res.sendStatus(204)
    }

}
module.exports={get_all_products,get_products_byID}