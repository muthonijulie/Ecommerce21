const express=require("express");

const {getContact,deleteContact}=require("../controllers/contactController");
const router=express.Router();


router.get("/",getContact);

router.delete("/:id",deleteContact);

module.exports=router;