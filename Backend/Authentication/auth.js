const jwt = require('jsonwebtoken');
require('dotenv').config();
const userloginsignup= require('../UserLoginSignup/UserLoginSignup')
const userdata= require("../Mongoose/UserDetails/UserDetails")
const auth= async (req,res,next)=>{
  try {
      const token= req.cookies.kushalcookie;
      if(!token){
        return res.status(400).json({message:"no access token is found"})
      }
      
    const verify= jwt.verify(token,process.env.ACESSTOKENSECRETKEY)
    if(!verify){
         return res.status(400).json({message:"invalid token"})
    }
    const VerifyUserData = await userdata.findById(verify?.id);
    if (!VerifyUserData) {
      return res
        .status(404)
        .json('Cannot find user');
    }

    req.user = VerifyUserData;
    next();
  } catch (error) {
      return res.status(400).json({message:"error in authorization"})
  }
}
const Admin=(req,res,next)=>{
    if (req.user.email!="budhathokikushal170@gmail.com"){
        res.status(400).json({message:"admin access only"})
    }
    next()
}
module.exports= {auth,Admin}