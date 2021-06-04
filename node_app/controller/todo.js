const express = require('express')
const todo = require('../../db/schema/todo')

const router = express.Router() 

router.get('/todos' , async(req,res)=>{
    var ans = await todo.find(); 
    res.json({
        success: true , 
        count: ans.length, 
        data: ans
    })     
})

router.post('/todos', async(req,res)=>{
    try{
        var body = req.body
        var maxorder = await todo.find({}, {order:1, _id:0}).sort({order:-1}).limit(1)
        maxorder = maxorder.length === 0 ? 0 : Number(maxorder[0].order+1)

        var ans = await todo.insertMany([
            {order:maxorder,title: body.title}
        ])

        res.json({
            success: true , 
            data: ans[0]
        })
    }catch(e){
        res.status(400).json({
            success: false, 
            error: "add failed"
        })
    }
})

router.get('/todos/:id', async(req,res)=>{
    try{
        var params = req.params.id
        var ans = await todo.find({
            _id : params 
        })   
        res.json({
            success: true , 
            data: ans[0]
        }) 
    }catch(e){
        res.status(400).json({
            success: false, 
            error: "get data failed"
        })
    }   
})

router.put('/todos/:id', async(req,res) =>{
    try{
        var params = req.params.id
        var body = req.body 
        if (body.title === undefined){
            throw new error("wrong title")
        }
        var ans = await todo.findByIdAndUpdate(params,{
            title: body.title 
        },{new:true}) 

        res.json({
            success: true , 
            data: ans
        })
    }catch(e){
        res.status(400).json({
            success: false, 
            error: "update failed"
        })
    }
})

router.delete('/todos/:id', async(req,res) =>{
    try{
        var params = req.params.id 
        var ans = await todo.deleteOne({ _id : params })
        
        res.json({
            success:true, 
            data:{}
        })
    }catch(e){
        res.status(400).json({
            success: false, 
            error: "delete failed"
        })
    }
})

module.exports = router