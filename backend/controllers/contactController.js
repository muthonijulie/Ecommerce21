const { error } = require("winston");
const Contact=require("../Model/Contact");

const getContact=async(req,res)=>{
    const contact=await Contact.find();
    res.json(contact);
};

const deleteContact=async(req,res)=>{
    await Contact.findByIdAndDelete(req.params.id);
    res.send("Message deleted");
    if(!req.params.id){
return res.status(400).json({error:"Contact ID is required"});
    }
};
module.exports={getContact,deleteContact};