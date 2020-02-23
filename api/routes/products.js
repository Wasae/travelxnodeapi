const express=require('express')
let mongoose=require('mongoose')
let Products=require('../../models/products')
let router=express.Router()

router.get('/',(req,res)=>{
    Products.find()
    .exec()
    .then(function(docs){
        if(docs && docs.length!=0){
            return res.status(200).json({
                documents:docs
            })
        }
        else{
            return res.status(200).json({
                message:"no records found"
            })
        }
    })
    .catch(function(err){
        return res.status(500).json({
            error:err
        })
    })
})

router.post('/',(req,res)=>{    
    let prod=new Products({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    })
    prod.save()
    .then(function(result){
        return res.status(200).json({
            message:"product for this id "+req.params.productid,
            product:result
        })
    })
    .catch(function(err){
        return res.status(500).json({
            error:err
        })
    })    
})

router.get('/:productid',(req,res)=>{    
    Products.findById(req.params.productid)
    .exec()
    .then(function(d){
        if(d){
            return res.status(200).json(d)
        }        
        return res.status(200).json({message:"No valid entry found"})
    })
    .catch(function(err){
        return res.status(500).json(err)
    })
})


router.patch('/:productid',(req,res)=>{
    Products.update({_id:req.params.id},{$set:{}})
    .exec()
    .then(function(d){
        return res.status(200).json(d)
    })
    .catch(function(er){
        return res.status(500).json(er)
    })
})

router.delete('/:productid',(req,res)=>{
    Products.remove({_id:req.params.id})
    .exec()
    .then(function(d){
        return res.status(200).json({
            message:d
        })
    })
    .catch(function(err){
        return res.status(500).json({
            error:err
        })
    })
})


module.exports=router;
