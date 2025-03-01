const express=require("express");

const {getItem,createItem,updateItem,deleteItem,deleteItems}=require("../controllers/cartController");

const router=express.Router();
router.post("/",createItem);
router.get("/",getItem);
router.put("/:id",updateItem);
router.delete("/:id",deleteItem);
router.delete("/",deleteItems);

module.exports=router;