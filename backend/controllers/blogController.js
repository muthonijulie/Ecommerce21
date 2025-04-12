const { error } = require("winston");
const Blog=require("../Model/Blog");
const createBlog=async(req,res)=>{
    try{
        const newBlog=await Blog.create(req.body);
        await newBlog.save();
        res.status(201).json(newBlog);
    }catch(error){
        res.status(400).json({error:"Bad request"});
    }
};

const getBlog=async(req,res)=>{
    const blog=await Blog.find();
    res.json(blog);
};
const updateBlog=async(req,res)=>{
    try{
        const blogs=await Blog.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!blogs){
            return res.status(404).json({message:"Server error",error:error.message});
        }
         res.json(blogs);

    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message});
    }
};

const deleteBlog=async(req,res)=>{
    await Blog.findByIdAndDelete(req.params.id);
    res.send("Blog deleted");
    if(!req.params.id){
return res.status(400).json({error:"Blog ID is required"});
    }
};
module.exports={getBlog,createBlog,updateBlog,deleteBlog};