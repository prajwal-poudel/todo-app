const express = require('express')
const router = express.Router();
const {userRegister,userLogin,homePage,addTodos,showTodos,updateTodo,deleteTodo,getTodoById} = require('./controller')
const upload = require('./middleware/imageUpload')
const tokenVerify = require('./middleware/verifyToken')
router.get('/',homePage)
.post("/register",userRegister)
.post("/login",userLogin)
.post("/todo",tokenVerify.verifyToken,upload.single("banner"),addTodos)
.get('/todo',showTodos)
.put('/todo/:id',tokenVerify.verifyToken,upload.single("banner"),updateTodo)
.delete('/todo/:id',tokenVerify.verifyToken,deleteTodo)
.get('/todo/:id',getTodoById)
module.exports = router