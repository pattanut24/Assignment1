const express = require('express')

const router = express.Router() 

router.get('/echo_get' , (req,res)=>{
    res.json({
        message:"Echo from router..."
    })
})

router.get('/echo_qs', (req,res)=>{
    var title = req.query.title 
    var page = req.query.page 

    res.json({
        title:title,
        page: page  
    })
})

router.get('/echo_params/:id', (req,res)=>{
    var params = req.params.id 
    res.json({
        params:params
    })

})

router.post('/echo_post', (req,res)=>{
    var body = req.body 
    res.json({
        id: body.id , 
        name : body.name 
    })
})

module.exports = router