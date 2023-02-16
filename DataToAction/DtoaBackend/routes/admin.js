const express = require('express')
const router  = express.Router()
const mongo = require('../database')

router.post('/add-template', async (req,res,next) => {
    try{
        var {title,content,inputfields} = req.body
        const oldTemplate = await mongo.selectedDb.collection("templates").find({title:title}).toArray()
        if(oldTemplate.length>0){
            return res.status(409).send("Template already exist!")
        }
        var data = await mongo.selectedDb.collection('templates').insertOne(req.body)
        res.status(200).send(data)
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})


module.exports = router;