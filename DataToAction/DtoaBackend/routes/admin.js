const express = require('express')
const router  = express.Router()
const mongo = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/add-template', async (req,res,next) => {
    try{
        var {title,content,inputfields} = req.body
        const oldTemplate = await mongo.selectedDb.collection("templates").find({title:title}).toArray()
        if(oldTemplate.length>0){
            return res.status(409).send("Template already exists!")
        }
        var data = await mongo.selectedDb.collection('templates').insertOne(req.body)
        res.status(200).send(data)
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})


router.post('/admin-register', async(req,res,next) => {
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

        let user = {userName:userName,password:encryptedPassword,admin:true}

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

router.post('/admin-login', async(req,res,next) => {
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