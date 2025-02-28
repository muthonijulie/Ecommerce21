const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Cart Schema
const cartSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
});

const Cart = mongoose.model("Cart", cartSchema);

// Add to Cart Route
app.post("/cart", async (req, res) => {
  const { productId, name, price, image } = req.body;

  try {
    let item = await Cart.findOne({ productId });
    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      item = new Cart({ productId, name, price, image, quantity: 1 });
      await item.save();
    }
    res.status(201).json({ message: "Item added to cart", item });
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
});

// Fetch Cart Items
app.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
});

// Update Item Quantity
app.put("/cart/:id", async (req, res) => {
  const { quantity } = req.body;
  try {
    const item = await Cart.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity", error });
  }
});

// Remove Item from Cart
app.delete("/cart/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
});

// Clear Entire Cart
app.delete("/cart", async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));