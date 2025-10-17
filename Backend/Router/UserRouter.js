const {register,login}=require("../UserLoginSignup/UserLoginSignup")
const express= require('express')
const userrouter= express.Router()
const {auth,Admin}= require("../Authentication/auth")
userrouter.post("/userregister",register)
userrouter.post("/userlogin",login)

module.exports= userrouter