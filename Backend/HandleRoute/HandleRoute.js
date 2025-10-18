const HandleRoute= (req,res,next)=>{
    return res.status(400).json({message:"Invalid Route"})

}
module.exports= HandleRoute