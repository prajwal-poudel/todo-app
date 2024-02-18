const express = require('express')
const http = require('http')
require('dotenv').config()
var  port = process.env.PORT
const app = express()

const router = require('./routes')
app.use("/",router)


const server = http.createServer(app)

server.listen(port,()=>{
    console.log("App Running in localhost:"+port);
})