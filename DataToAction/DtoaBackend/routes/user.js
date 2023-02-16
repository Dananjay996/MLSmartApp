const express = require('express')
const router  = express.Router()

router.post('/create-doc',(req,res,next) => {
    console.log(req)
})

router.get('/receive-doc',(req,res,next) => {
    console.log(req)
})

module.exports = router;