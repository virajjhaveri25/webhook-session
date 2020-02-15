const express=require("express");
const bodyParser=require('body-parser');
const MongoClient=require("./database/connection");
const app=express();
const WebHookModel=require("./database/webhook.model");

MongoClient().then(()=>{
    console.log("connected");
})
.catch(console.log)

app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.send("welcome to hands on demo of WebHook");
})

app.get("/api/webhooks",(req,res)=>{
    WebHookModel
    .find()
    .then((wh)=>{
        res.json({
        flag:true,
        data:wh,
        message: "successful"
    });
    }).catch(e=> {
        res.json({

            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.post("/api/webhook",(req,res)=>{

    let body=req.body;
    WebHookModel
    .create(body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"succesfully created"
        });
    }).catch(e=>{
        res.json({

            flag:false,
            data:null,
            message:e.message
        });
    })
})
app.put("/api/webhook/:id",(req,res)=>{

    let body=req.body;

    WebHookModel
    .findByIdAndUpdate(req.params.id,body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfully updated"
        });
    })
})

app.delete("/api/webhook/:id",(req,res)=>{

    WebHookModel.findByIdAndRemove(req.params.id,function(err,wh){
        if(err)
        {
            res.json({
                flag:false,
                data:null,
                message:err.message
            });
        }
        else{
            res.json({
                flag:true,
                data: wh,
                message:"successfully deleted"
            });
        }
    })
})
app.listen(3000)
// .then((wh)=>{
//     console.log("Server has been start  successfully");
// }).catch((ch)=>{
//     console.log("server has not started");
// })