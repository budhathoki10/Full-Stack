const bcrypt= require("bcryptjs")
const jwt =require("jsonwebtoken")
const userdata= require("../Mongoose/UserDetails/UserDetails")
const cookie= require("cookie-parser")
const register= async(req,res)=>{
    const {email,username,password,address}=req.body
    const checkemail= await userdata.findOne({email:email})
    if(checkemail){
        return res.status(400).json({message:"this email is already taken"})
    }
    const bcryptpassword= await bcrypt.hash(password,10)
    const newdata= new userdata({
        email,
        username,
        password:bcryptpassword,
        address
    })
    await newdata.save()
     return res.status(200).json({message:"user register",newdata})

}
const login= async (req,res)=>{
   try {
     const {email,password}= req.body
    const checkemail= await userdata.findOne({email:email})
    if(!checkemail){
        return res.status(400).json({message:"couldnot find this email"})
    }
    const checkpass= await bcrypt.compare(password,checkemail.password)
    console.log("hello")
    if(!checkpass){
return res.status(400).json({message:"incorrect password"})
    }
  const token=   jwt.sign({id:checkemail.id, email:checkemail.email},
        process.env.ACESSTOKENSECRETKEY,
        {
        expiresIn:"90d"
    },
)
return res.cookie("kushalcookie", token).status(200).json({message:'login sucessfully',token})
    
   } catch (error) {
    return res.status(400).json({message:"internal server error", error: error.message})
   }

}
module.exports= {register,login}