const {CreateItems,readItems,UpdateItems,DeleteItems}= require("../Admin/CRUDitems")
const express= require('express')
const cruditems= express.Router()
const {auth,Admin}= require("../Authentication/auth")
cruditems.post("/admin/createitems",auth,Admin, CreateItems)
cruditems.get("/admin/readitems",auth,Admin, readItems)
cruditems.put("/admin/updateitems/:id",auth,Admin, UpdateItems)
cruditems.delete("/admin/deleteitems/:id",auth,Admin, DeleteItems)
module.exports= cruditems