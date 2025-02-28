const mongoose=require('mongoose');
const cartSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
});
module.exports=mongoose.model("Cart",cartSchema)