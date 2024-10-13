const exp=require('express')
const app=exp()
require('dotenv').config()
const userapp=require('./APIs/usersapi')
const authorapp=require('./APIs/authorapi')
const adminapp=require('./APIs/adminapi')
const mongodb=require('mongodb').MongoClient
const path=require('path')
const cors=require('cors')

app.use(cors()) 


app.use(exp.static(path.join(__dirname,'../front_end/build')))


mongodb.connect(process.env.connectingURL)
.then(client=>{
    //to get db obj
    const blogappdb=client.db('blogappdb')
    //to get collections obj
    const userscollection=blogappdb.collection('userscollection')

    const authorcollection=blogappdb.collection('authorcollection')

    const admincollection=blogappdb.collection('admincollection')

    const articlescollection=blogappdb.collection('articlescollection')
    //share collections object 
    app.set('userscollection',userscollection)
    app.set('authorcollection',authorcollection)
    app.set('admincollection',admincollection)
    app.set('articlescollection',articlescollection)
})


.catch(err=>console.log("err in Db connection",err))



//if user-api path comes then send it to userapp
app.use('/user-api',userapp)
//if author-api path comes then send it to authorapp
app.use('/author-api',authorapp)
//if admin-api path comes then send it to adminapp
app.use('/admin-api',adminapp)

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../front_end/build/index.html'))
})

const port=process.env.PORT || 5000
app.listen(port,()=>{console.log(`server running on port ${port}`)})