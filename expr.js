const express=require("express");
const path=require("path");
const app=express();
const port=process.env.PORT||300
const mongoose=require('mongoose');
const { json } = require("express");
const { stringify } = require("querystring");
const url='mongodb+srv://tushant07:tushant07@cluster0.b6dej.mongodb.net/country?retryWrites=true&w=majority'
const urll='mongodb://127.0.0.1:27017/countries'
var body_parser=require('body-parser');
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended:true
}));
let response;
mongoose.connect(urll,{
    useNewUrlParser:true
});
const db=mongoose.connection
db.on('error',error=>console.error(error));
db.once('open',()=>{
    console.log('connected to database');
})
var nameschema=new mongoose.Schema({
    country:[{}]
})
var user=mongoose.model("user",nameschema);
app.use("/public",express.static("static"));
app.post("/save",(req,res)=>{
  
    setTimeout(() => {
         response={
            data:req.body,
            country:req.body.list
        }
        
        console.log(JSON.stringify(response));
    }, 10000);
    
    
    
})
app.post('/savee',(req,res)=>{
    setTimeout(() => {
        response={
           
           country:req.body.list
       }
       
       console.log(JSON.stringify(response));
   }, 5000);
    var mydata=new user({
        "country":req.body.list});
    setTimeout(() => {
     mydata.save()
     .then(item=>{
         res.send('item saved to database');
     })
    ;
    }, 5000);
})

app.get('/',(req,res)=>{
    
    res.sendFile(path.join(__dirname,"static","index.html"));
}).listen(port);
