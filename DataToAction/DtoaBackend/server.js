const http = require('http');
const dotenv = require("dotenv")
const mongo = require("./database")
const express = require('express');
const cors = require('cors')

dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())
mongo.connect()
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')

app.use(adminRoutes);
app.use(userRoutes);

app.use('/',(req,res,next) => {
    res.status(404).send('<h1>Page not found</h1>')
})
app.listen(process.env.PORT || 3000);