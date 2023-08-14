const products=require('../model/products')

//get all products
const get_all_products=async(req,res)=>{
    const {username,userId,role}=req.userInfo
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

module.exports={get_all_products}