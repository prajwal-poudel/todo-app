const express = require('express')
const http = require('http')
const body_parser = require('body-parser')
require('dotenv').config()
var  port = process.env.PORT
const app = express()

const router = require('./routes')

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json())
app.use("/",router)


const server = http.createServer(app)

server.listen(port,()=>{
    console.log("App Running in localhost:"+port);
})