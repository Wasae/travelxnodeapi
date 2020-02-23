let express=require('express')
let router=express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({
        message:"handling get orders"
    })
})

router.get('/:orderid',(req,res)=>{
    res.status(200).json({
        message:"order for this id "+req.params.orderid
    })
})


router.patch('/:orderid',(req,res)=>{
    res.status(200).json({
        message:"patch request fired for this "+req.params.orderid
    })
})

router.delete('/:orderid',(req,res)=>{
    res.status(200).json({
        message:"delete request fired for this "+req.params.orderid
    })
})

module.exports=router