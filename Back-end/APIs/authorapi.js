//creating user api
const exp=require('express')
const authorapp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv')
const expressasynchandler=require('express-async-handler')
const verifyToken=require('../Middlewares/verifyToken')

authorapp.use(exp.json())
let authorcollection,articlescollection;
authorapp.use((req,res,next)=>{
    authorcollection=req.app.get('authorcollection')
    articlescollection=req.app.get('articlescollection')
    next()
})

//for registering
authorapp.post('/Register',expressasynchandler(async(req,res)=>{

    const newAuthor=req.body
    const chectDuplicate=await authorcollection.findOne({username:newAuthor.username})

    if(chectDuplicate!=null){

        res.send({message:"author already existed"})

    }
    else{
        //hash the password
        const convertPassToHashPass=await bcryptjs.hash(newAuthor.password,6)
        //replace plain pass with hash pass
        newAuthor.password=convertPassToHashPass
        //send to info to db
        await authorcollection.insertOne(newAuthor)
        res.send({message:"author registered"})
    }

     
}))

//for login
authorapp.post('/Login',async(req,res)=>{
    const LoginAuthor=req.body
    //check the username
    const checkUserName=await authorcollection.findOne({username:LoginAuthor.username})
    if(checkUserName===null){
        res.send({message:"author is not registered"})
    }
    //check password
    else{
        const status=await bcryptjs.compare(LoginAuthor.password,checkUserName.password)
        if(status===false)
        {
            res.send({message:"Invalid password"})
        }
        else
        {
            const token=jwt.sign({usermane:checkUserName.username},process.env.SECREAT_KEY,{expiresIn:'1d'})
            res.send({message:"author has Logined",token:token,user:checkUserName})
        }
    }
    


})
//for getting all articles
authorapp.get('/articles',verifyToken,expressasynchandler(async(req,res)=>{
    let articlescollection=req.app.get('articlescollection')
    const articles=await articlescollection.find().toArray()
    res.send({message:"articles",payload:articles})
}))

//getting articles of a particular author
authorapp.get('/articles/:author', verifyToken, expressasynchandler(async(req, res) => {
    const authorname = req.params.author;
    const articles = await articlescollection.find({ username: authorname }).toArray();
  
    if (articles.length === 0) {
      return res.status(404).send({ message: "No articles found for this author" });
    }
  
    res.send({ message: "articles", payload: articles });
  }));
  

//creating a new article by author 
authorapp.post('/articles',verifyToken,expressasynchandler(async(req,res)=>{

    const newArticle=req.body;
    
    await articlescollection.insertOne(newArticle)
    res.send({message:"New article created"})

}))

//updating the artcles 
authorapp.put('/articles',verifyToken,expressasynchandler(async(req,res)=>{
    const updateArticle=req.body;
   console.log(updateArticle)
  const result = await articlescollection.updateOne({ articleId: updateArticle.articleId }, { $set: { ...updateArticle } });

  console.log(result)
    res.send({message:"Article has been updated"})
    
}))

//for soft deleting
authorapp.put('/articles/:articleId',verifyToken,expressasynchandler(async(req,res)=>{
    const softDelete=req.body;
    const deletingId=(req.params.articleId)

    console.log(deletingId)
   const result= await articlescollection.updateOne({articleId:deletingId},{$set:{...softDelete}})
   console.log(result) 
   //res.send({message:"the data has been deleted"})
}))
//exporting authorapi
module.exports=authorapp;