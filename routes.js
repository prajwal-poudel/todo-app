const express = require('express')
const router = express.Router();
const {userRegister,userLogin,homePage} = require('./controller')
router.get('/',homePage)
.post("/register",userRegister)
.post("/login",userLogin)
module.exports = router