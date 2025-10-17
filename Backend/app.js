const express= require("express")
const app=express()
const mongoose= require("mongoose")
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userrouter= require("./Router/UserRouter")
require('dotenv').config()
mongoose.connect("mongodb://localhost:27017/fullstackproject").then(()=>{
    console.log("sucessfully connect to mongodb")
}).catch(()=>{
    console.log("cannot connect to mongodb")
})
app.use("/api",userrouter)
app.listen(5000,()=>{
console.log("connected to server")
})