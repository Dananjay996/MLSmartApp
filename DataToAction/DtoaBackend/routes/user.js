const express = require('express')
const router  = express.Router()
const mongo = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        if(data.length<1){
            return res.status(401).send("No template found")
        }
        res.status(200).send(data[0])
    }catch(err){
        res.status(500).send(err)
    }
})


router.post('/user-register', async(req,res,next) => {
    try{
        const {userName, password} = req.body;

        if(!(userName && password)){
            res.status(400).send("All input is required")
        }

        const oldUser = await mongo.selectedDb.collection("Users").find({userName:userName}).toArray()
        
        if(oldUser.length>0){
            console.log(oldUser)
            return res.status(409).send("User already exist! Please login")
        }

        let encryptedPassword = await bcrypt.hash(password,10)

        let user = {userName:userName,password:encryptedPassword,admin:false}

        let data = await mongo.selectedDb.collection("Users").insertOne(user)

        let newUser = await mongo.selectedDb.collection("Users").find({userName:userName}).toArray()
        newUser = newUser[0]
        const token = jwt.sign(
            {user_id:userName},
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        )

        user = {
            _id:newUser._id,
            userName:newUser.userName,
            password:newUser.password,
            admin:newUser.admin,
            token:token
        }

        res.cookie("token",token,{maxAge:3600000, sameSite: 'none'})

        res.status(201).send(user)

    }catch(err){
        console.log(err)
    }
})

router.post('/user-login', async(req,res,next) => {
    try{
        const {userName,password} =req.body;
        if(!(userName && password)){
            res.status(400).send("All inputs are required")
        }

        let user = await mongo.selectedDb.collection("Users").find({userName}).toArray()
        user = user[0]
        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign(
                {user_id:userName},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h"
                }
            )

            user = {
                _id: user._id,
                userName: user.userName,
                password: user.password,
                admin:user.admin,
                token: token
            }

            res.cookie("token",token,{maxAge:3600000, sameSite: 'none'})

            return res.status(200).send(user)
        }
        return res.status(400).send("Invalid Credintials")
    }catch(err){
        console.log(err)
    }
})

module.exports = router;