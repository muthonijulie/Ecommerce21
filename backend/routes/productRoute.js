const express=require("express");
const {getProduct}=require("../controllers/productController");

const router=express.Router();

router.get("/",getProduct);
module.exports=router;