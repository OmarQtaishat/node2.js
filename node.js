var express= require('express')
var app=express();

const {MongoClient}=require('mongodb')

var connection="mongodb+srv://qtaishatomar:omar2003@cluster0.rzmcq9w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client= new MongoClient(connection)

const mydb= client.db('omar')

const collection= mydb.collection('users')


app.get("/", function(req,res)
{
     res.send("hello ")
})

app.get("/users",async(req,res)=>{
     //find  =>{}=>all
     const users= await collection.find({}).toArray() 
     res.send(users)
})

app.get("/user/:username",async(req,res)=>{
     //find  =>{}=>all
     const users= await collection.findOne({'username':req.params.username}) 
     res.send(users)
})

var bodyParse= require('body-parser')

var urlEncoded= bodyParse.urlencoded({extended:false})

app.get("/form", function(req,res)
{
    res.sendFile(__dirname+"/login.html")
})

var fs= require('fs')

app.get("/userinfo", function(req,res){
     // var data=fs.readFileSync(__dirname+"/currentuser.txt")
     // res.json(data)

    var current= localStorage.getItem('currenUser')  //type of cash 
    res.json(data)
})                  

app.post("/login",urlEncoded, async(req,res)=>
{
      const finduser= await collection.findOne({'userName':req.body.userName})
      if (finduser) 
      {   //fs.writeFileSync(__dirname+"/currentuser.txt")
          localStorage.setItem('currentUser', finduser)
          res.sendFile(__dirname+"/userInfo.html")
      }
      else{
          res.sendFile(__dirname+"/reg.html")
      }
})


app.post("/register",urlEncoded, async(req,res)=>
{    //find 
     const createuser= await collection.insertOne({'userName': req.body.userName})
    
})



var server= app.listen(9090,function()
{
     var host = server.address().address
     var port=server.address().port

     console.log("start my one")
})