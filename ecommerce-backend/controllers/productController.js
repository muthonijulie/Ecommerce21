const Product=require("../Models/Product");

const createProduct=async(req,res)=>{
    try{
        const newProduct=await Product.create(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    }catch(error){
        res.status(400).json({error:"Bad request"});
    }
};
const getProduct=async(req,res)=>{
    const products=await Product.find();
    res.json(products);
};

const getProductId=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message:"Product not found"});
        res.json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const updateProduct=async(req,res)=>{
    try{
        const updateProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updateProduct){
            return res.status(404).json({message:"Product not found"});
        }
        res.json(updateProduct);
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message});
    }
};

const deleteProduct=async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product deleted")
};

module.exports={getProduct,getProductId,createProduct,updateProduct,deleteProduct};