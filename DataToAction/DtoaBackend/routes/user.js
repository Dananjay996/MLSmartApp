const express = require('express')
const router  = express.Router()
const mongo = require('../database')

router.get('/all-template', async (req,res,next) => {
    try{
        var data = await mongo.selectedDb.collection('templates').find().toArray()
        res.status(200).send(data)
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/template/:title',async (req,res,next) => {
    try{
        var data = await mongo.selectedDb.collection('templates').find({title:req.params.title}).toArray()
        res.status(200).send(data[0])
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = router;