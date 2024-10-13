//creating user api
const exp=require('express')
const userapp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv')
const expressasynchandler=require('express-async-handler')
const verifyToken = require('../Middlewares/verifyToken')

userapp.use(exp.json())
let userscollection;
userapp.use((req,res,next)=>{
    userscollection=req.app.get('userscollection')
    next()
})

//for registering
userapp.post('/Register',expressasynchandler (async(req,res)=>{

    const newUser=req.body
    const chectDuplicate=await userscollection.findOne({username:newUser.username})

    if(chectDuplicate!=null){

        res.send({message:"user already existed"})

    }
    else{
        //hash the password
        const convertPassToHashPass=await bcryptjs.hash(newUser.password,6)
        //replace plain pass with hash pass
        newUser.password=convertPassToHashPass
        //send to info to db
        await userscollection.insertOne(newUser)
        res.send({message:"user registered"})
    }

     
}))
//for login
userapp.post('/Login',async(req,res)=>{
    const LoginUser=req.body
    //check the username
    const checkUserName=await userscollection.findOne({username:LoginUser.username})
    //check userType
    if(LoginUser.userType==='user')
    {
    if(checkUserName===null){
        res.send({message:"user is not registered"})
    }
    //check password
    else{
        const status=await bcryptjs.compare(LoginUser.password,checkUserName.password)
        if(status===false)
        {
            res.send({message:"Invalid password"})
        }
        else
        {
            const token=jwt.sign({usermane:checkUserName.usermane},process.env.SECREAT_KEY,{expiresIn:'1d'})
            res.send({message:"User has Logined",token:token,user:checkUserName})
        }
    }
}
else{
    res.send({message:"userType is not matched"})
}


})
//to get all articles
userapp.get('/articles', async (req, res) => {
    try {
      let articlescollection = req.app.get('articlescollection');
      const articles = await articlescollection.find().toArray();
      res.send({ message: "articles", payload: articles });
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
  });
  



//to write comments
userapp.post('/comments',verifyToken,expressasynchandler(async(req,res)=>{

    let postComment=req.body
    let articlescollection=req.app.get('articlescollection') 
    const result=await articlescollection.updateOne({articleId:postComment.articleId},{$addToSet:{comments:postComment}})
    res.send({message:"article comment added"})
    console.log(result) 
}))

//exporting userapp
module.exports=userapp;