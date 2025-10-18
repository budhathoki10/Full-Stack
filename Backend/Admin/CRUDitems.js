const itemdetails = require("../Mongoose/Items/Items");

const CreateItems = async (req, res) => {
  try {
    const { product } = req.body;
    if (!product || !Array.isArray(product)) {
      return res.status(400).json({ message: "Product must be an array of objects" });
    }
    const newItem = new itemdetails({ product });
    await newItem.save();

    return res.status(201).json({
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating item",
      error: error.message,
    });
  }
};


const readItems= async(req,res)=>{
   try {
     const readAllData= await itemdetails.find()
     if(!readAllData){
          return res.status(400).json({ message: "database is empty" });
     }
     return res.status(200).json({data:readAllData})
 }
   catch (error) {
     return res.status(500).json({ message:"internal server eroor" });
     
   }
}


const UpdateItems= async (req,res) => {
    try {
        const {id}=req.params
        const {product}=req.body
        const updateedItems= await itemdetails.findByIdAndUpdate(id,{product}, {new:true})
        if(!updateedItems){
            return res.status(400).json({ message:"failed to update" });
        }
         return res.status(200).json({ message: "sucessfully updated",
            data:updateedItems
          });
    } catch (error) {
      return res.status(500).json({ message:error.message });   
    }

}
const DeleteItems= async(req,res)=>{
        try {
        const {id}=req.params
        const deleteItems= await itemdetails.findByIdAndDelete(id)
        if(!deleteItems){
            return res.status(400).json({ message:"no id found" });
        }
         return res.status(200).json({ message: "sucessfully delete",
            data:deleteItems
          });
    } catch (error) {
      return res.status(500).json({ message:error.message });   
    }
}
module.exports = {CreateItems,readItems,UpdateItems,DeleteItems};
