const express =require('express')
const app=express()
const user=require('./controller/user')
const bodyParser=require("body-parser")
const cors=require("cors")
const ErrorHandler=require("./middleware/error")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(ErrorHandler)
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