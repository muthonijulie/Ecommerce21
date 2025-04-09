const Product=require("../Model/Product")

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
    const product=await Product.find();
    res.json(product);
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
    if (!req.params.id) {
  return res.status(400).json({ error: "Product ID is required" });
}

};

// const getProduct= async (req, res) =>{
// const products = [
//   {
//     img: NiveaSunscreen,
//     brand: "Nivea",
//     name: "Hydrating Sunscreen",
//     price: "3500/=",
//   },
//   {
//     img: ThankYouFarmer,
//     brand: "ThankYou",
//     name: "Safe Sun Fluid",
//     price: "3,500/=",
//   },
//   {
//     img: SpeickSun,
//     brand: "SpeickSun",
//     name: "Matte Sun Block",
//     price: "3,500/=",
//   },
//   {
//     img: YamRootMilk,
//     brand: "IsnTree",
//     name: "Toning Sun Cream",
//     price: "3,500/=",
//   },
//   {
//     img: Rebornfeel,
//     brand: "Rebornfeel",
//     name: "Full Skincare Set",
//     price: "15,000/=",
//   },
//   {
//     img: Cloque,
//     brand: "Cloque",
//     name: "Lavender Set",
//     price: "13,750/=",
//   },
//   {
//     img: FentySkin,
//     brand: "Fenty Skin",
//     name: "AM + PM Skincare Essentials",
//     price: "25,000/=",
//   },
//   {
//     img: Maaemo,
//     brand: "Maaemo",
//     name: "Organic Skincare Set",
//     price: "20,000/=",
//   },
// ];
// res.json(products);
// }

module.exports={getProduct,createProduct,updateProduct,deleteProduct};