const express =require('express')
const app=express()
const user=require('./controller/userController')

app.use("/api/v2/user",user)

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "BACKEND/config/.env"
    })
}

app.get('/',(req,res)=>{
    return res.send('Welcome to backend ')
})

module.exports=app;