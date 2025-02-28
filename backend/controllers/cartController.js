const Cart=require("../Model/Cart");

const createItem= async (req, res) => {
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
};

// Fetch Cart Items
const getItem= async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
};

// Update Item Quantity
const updateItem= async (req, res) => {
  const { quantity } = req.body;
  try {
    const item = await Cart.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity", error });
  }
};

// Remove Item from Cart
const deleteItem= async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

// Clear Entire Cart
const deleteItems= async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};

module.exports={getItem,createItem,updateItem,deleteItem,deleteItems};