
//creating user api
const exp=require('express')
const adminapp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv')
const expressasynchandler=require('express-async-handler')

adminapp.use(exp.json())
let admincollection;
adminapp.use((req,res,next)=>{
    admincollection=req.app.get('admincollection')
    next()
})

//for registering
adminapp.post('/Register',expressasynchandler(async(req,res)=>{

    const newAdmin=req.body
    const chectDuplicate=await admincollection.findOne({username:newAdmin.username})

    if(chectDuplicate!=null){

        res.send({message:"user already existed"})

    }
    else{
        //hash the password
        const convertPassToHashPass=await bcryptjs.hash(newAdmin.password,6)
        //replace plain pass with hash pass
        newAdmin.password=convertPassToHashPass
        //send to info to db
        await admincollection.insertOne(newAdmin)
        res.send({message:"user registered"})
    }

     
}))


//for login
adminapp.post('/Login',async(req,res)=>{
    const loginadmin=req.body
    //check the username
    const checkUserName=await admincollection.findOne({username:loginadmin.username})
    if(checkUserName===null){
        res.send({message:"Admin is not registered"})
    }
    //check password
    else{
        const status=await bcryptjs.compare(loginadmin.password,checkUserName.password)
        if(status===false)
        {
            res.send({message:"Invalid password"})
        }
        else
        {
            const token=jwt.sign({usermane:checkUserName.usermane},process.env.SECREAT_KEY,{expiresIn:20})
            res.send({message:"Admin has Logined",token:token,user:checkUserName})
        }
    }
    


})

adminapp.get('/articles',expressasynchandler(async(req,res)=>{
    let articlescollection=req.app.get('articlescollection')
    const articles=articlescollection.find().toArray()
    res.send({message:"articles",payload:articles})
}))

//exporting adminapi
module.exports=adminapp;