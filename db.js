const mysql = require('./config')

const checkPhone = (phone,callBack)=>{
    mysql.query(`select * from user where phone=?`,[phone],callBack)
}
const addUser = (data,callBack)=>{
    mysql.query(`insert into user (fullname,email,password,phone) values(?,?,?,?)`,
    [data.fullname,data.email,data.password,data.phone],callBack)
}

module.exports = {
    checkPhone:checkPhone,
    addUser:addUser
}