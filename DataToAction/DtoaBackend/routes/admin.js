const express = require('express')
const router  = express.Router()
const mongo = require('../database')

router.post('/add-template', async (req,res,next) => {
    try{
        var data = await mongo.selectedDb.collection('templates').insertOne(req.body)
        res.status(200).send(data)
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})


module.exports = router;