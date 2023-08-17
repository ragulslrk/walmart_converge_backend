const express=require('express')
const cookieParser = require('cookie-parser');
const cors=require("cors")
const morgan = require('morgan')
const corsOptions=require('./config/corsOptions')
const  mongoose=require('mongoose')
const user=require('./model/user')
const app=express()

//logging middleware instanciation
app.use(morgan('dev'))

// cors middleware
app.use(cors(corsOptions))

//cookie config
app.use(cookieParser())

//basic config
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}))
require("dotenv").config()



//connecting to the DB
mongoose.connect( 'mongodb+srv://ragulNolan:%23Ragul4444@cluster0.6qh9t.mongodb.net/walmart?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})
.then((res)=>{
    app.listen(process.env.PORT ||3232,()=>{
        console.log('walmart converge Server Started listening 🚀🚀🚀🚀 ')
})
})
.catch((err)=>{console.log(err)})

//route login
const login=require('./routes/login')
app.use(login)

//route  to refresh  token 
const refresh_token=require('./routes/refreshToken')
app.use(refresh_token)

//route  to  products
const  products=require('./routes/products')
app.use(products)

//route to productInsights
const product_insights=require('./routes/productInsight')
app.use(product_insights)

//route to orders
const orders=require("./routes/orders")
app.use(orders)

//test route to signup
app.post('/signup',async (req,res)=>{
    console.log(req.body)
   const  newUser=new  user(req.body)
    const result=await newUser.save()
    res.json('user Created successfully')
})
