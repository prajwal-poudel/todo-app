const express = require('express')
const http = require('http')

const app = express()
app.use("/",(req,res)=>{
    res.json({message:"Home Page"})
})

const server = http.createServer(app)

server.listen(5000,()=>{
    console.log("App Running in localhost:5000");
})