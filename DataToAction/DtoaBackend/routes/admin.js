const express = require('express')
const router  = express.Router()

router.post('/add-template',(req,res,next) => {
    console.log(req)
})

module.exports = router;