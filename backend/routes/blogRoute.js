const express=require("express");
const { getBlog,createBlog,updateBlog,deleteBlog } = require("../controllers/blogController");
const router=express.Router();

router.post("/",createBlog);
router.get("/",getBlog);
router.put("/:id",updateBlog);
router.delete("/:id",deleteBlog);

module.exports=router;
