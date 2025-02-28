const mongoose=require('mongoose');
const productSchema = new mongoose.Schema({
  brand: String,
  name: String,
  price: Number,
  img: String,
});
module.exports=mongoose.model("Product",productSchema)