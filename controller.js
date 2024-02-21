const {checkPhone,addUser} = require('./db')
const bcrypt = require("bcrypt");


const homePage = (req,res)=>{
    res.status(200).json({message:"Home Page"})
}

const userRegister =(req,res)=>{
    var data = req.body;
    console.log(data);
    checkPhone(data.phone,(err,result)=>{
        if(err){
            res.status(500).json({message:"Server Error!"})
        }else{
            if(result.length == 0){
    const hashedPassword = bcrypt.hashSync(data.password,8);
    data.password = hashedPassword;
    console.log(data);
                addUser(data,(err,result)=>{
                    if(err){
            res.status(500).json({message:"Server Error!"})

                    }else{
                        res.status(201).json({message:"User Added!!"})
                    }
                })
                
            }else{
                res.status(200).json({message:"Phone number taken"})
            }
        }
    })
   
}

const userLogin = (req,res)=>{}

module.exports = {
    homePage:homePage,
    userRegister:userRegister,
    userLogin:userLogin
}
