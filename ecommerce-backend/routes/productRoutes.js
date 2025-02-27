const express=require("express");
const {getProduct,getProductId,createProduct,deleteProduct, updateProduct}=require("../controllers/productController");

const router=express.Router();

router.get("/",getProduct);
router.get("/:id",getProductId);
router.post("/",createProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);

module.exports=router;