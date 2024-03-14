
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const model = require('./models');



const homePage = (req,res)=>{
    res.status(200).json({message:"Home Page"})
}

const userRegister =async(req,res)=>{
    var data =  req.body;
    console.log(data);
    try{

        var result =await model.user.findOne({where:{phone:data.phone}})
    console.log(result);
    if(result){
        res.status(200).json({message:"Phone number taken"})
    }else{
        const hashedPassword = bcrypt.hashSync(data.password,8);
        data.password = hashedPassword;
        var addUser = await model.user.create({
            fullname:data.fullname,
            phone:data.phone,
            email:data.email,
            password:data.password
        });
        console.log(addUser);
        res.status(201).json({message:"User Added Successfully",data:data})
    }

    }catch(err){
        res.status(500).json({message:"Internal Server Error!!"})
    }
    
   
    // checkPhone(data.phone,(err,result)=>{
    //     if(err){
    //         console.log(err);
    //         res.status(500).json({message:"Server Error!"})
    //     }else{
    //         if(result.length == 0){
    // const hashedPassword = bcrypt.hashSync(data.password,8);
    // data.password = hashedPassword;
    // console.log(data);
    //             addUser(data,(err,result)=>{
    //                 if(err){
    //                     console.log(err);
    //         res.status(500).json({message:"Server Error!"})

    //                 }else{
    //                     res.status(201).json({message:"User Added!!"})
    //                 }
    //             })
                
    //         }else{
                // res.status(200).json({message:"Phone number taken"})
    //         }
    //     }
    // })
   
}

const userLogin = async(req,res)=>{

    try{
        var data = req.body;
        console.log(data);
    
        var result = await model.user.findOne({where:{phone:data.phone}});
    
        if(result){
    // token match password         
                var isMatched = bcrypt.compareSync(data.password,result.password)
                if(isMatched){
                   /// JWT Token 
                   var token = jwt.sign({id:result.id,phone:result.phone},process.env.JWT_TOKEN_KEY,{expiresIn:"1d"})
                   console.log(token);
                   result.password = undefined;
                   res.status(200).json({message:"Login Success!!",token:token,data:result})
                }else{
                    res.status(404).json({message:"Invalid Cradential"}) 
                }
    
        }else{
            res.status(404).json({message:"Invalid Cradential"})
        }
    }catch(err){
        res.status(500).json({message:"Internal Server Error!!"})
    }
    
}


const addTodos = async(req,res)=>{

    try{
        console.log(req.userData);
        var data = req.body;
        data.todoBanner ="http://localhost:5000/" + req.file.path;
        console.log(data);
        var result = await model.todo.create({
            title:data.title,
            description:data.description,
            actionDate:data.actionDate,
            todoBanner:data.todoBanner,
            userId:req.userData.id
        });
        if(result){
            res.status(201).json({message:"todo added Successfully!!"})
        }else{
            res.status(500).json({message:"Something Went Wrong!!"})
        }


    }catch(err){
        res.status(500).json({message:"Internal Server Error!!"})
    }

}
const showTodos = async(req,res)=>{
    try{
        var result = await model.todo.findAll(
            {
                include:[
                {model:model.user,as:"user",attributes:{exclude:['password']}}
            ]
        });
        
        res.status(200).json({message:"Successfull Fetched!",data:result})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error!!"})
    }
}

const updateTodo = async(req,res)=>{
    try{
        var todoId = req.params.id;
        var data = req.body;
        if(req.file){
            data.todoBanner = "http://localhost:5000/" + req.file.path
        }
        var getTodo = await model.todo.findOne({where:{id:todoId,userId:req.userData.id}})
        if(getTodo){
            var result = model.todo.update(data,{where:{id:todoId}})
            res.status(200).json({message:"Sucessfully Updated"})

        }else{
            res.status(401).json({message:"Invalid!!"})

        }
    }catch(err){
        res.status(500).json({message:"Internal Server Error!!"})

    }
}

const deleteTodo = async(req,res)=>{
    try{
        var todoId = req.params.id;
        var getTodo = await model.todo.findOne({where:{id:todoId,userId:req.userData.id}})
        if(getTodo){
            var result = model.todo.destroy({where:{id:todoId}})
            res.status(200).json({message:"Sucessfully Deleted"})

        }else{
            res.status(401).json({message:"Invalid!!"})

        }

    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
}

const getTodoById = async(req,res)=>{
  try{
    var todoId = req.params.id;
    var result = await model.todo.findByPk(todoId,{include:[
        {model:model.user,as:"user",attributes:{exclude:['password']}}
    ]});
    res.status(200).json({message:"Todo Fetched",data:result})
  }catch(err){
    res.status(500).json({message:"Internal Server Error!!"})
  }

}


module.exports = {
    homePage:homePage,
    userRegister:userRegister,
    userLogin:userLogin,
    addTodos:addTodos,
    showTodos:showTodos,
    updateTodo:updateTodo,
    deleteTodo:deleteTodo,
    getTodoById:getTodoById
}
