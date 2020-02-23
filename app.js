const express=require('express')
const productroutes=require('./api/routes/products')
const orderroutes=require('./api/routes/orders')
const morgan=require('morgan')
let  bodyparser=require('body-parser')
let app=express()

let mongoose=require('mongoose')
mongoose.connect("mongodb+srv://wasae:Wasae@123@wasaecluster-tt0fj.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
app.use(morgan('dev')) //logging

app.use(bodyparser.urlencoded({extended:false})) //body parsing
app.use(bodyparser.json())

app.use((req,res,next)=>{ //CORS
    res.header("Access-Control-Allow-Origin",'*')
    res.header("Access-Control-Allow-Headers",
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    )

    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allowe-Methods","GET,PUT,POST,PATCH,DELETE")
        return res.status(200).json({})
    }

    next()
})

app.use('/products',productroutes) //App routes
app.use('/orders',orderroutes)

app.use((req,res,next)=>{ //Error handling
    let error=new Error("Not Found")
    error.status(404)
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status||404).json({
        message:error.message
    })
})

module.exports=app