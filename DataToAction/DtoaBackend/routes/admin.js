const express = require('express')
const router  = express.Router()

router.post('/add-template',(req,res,next) => {
    console.log(req.url);
    console.log("LOGGED");

    //Do some things


    const vararray = [];
    res.send(varArray);
})

router.post('/add-dataType', (req,res,next) => {
    console.log(req);
})

module.exports = router;