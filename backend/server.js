const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const Cart=require('./Model/Cart');
const Product=require('./Model/Product');

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



// Add to Cart Route
const cartRoute=require("./routes/cartRoute");
const productRoute=require("./routes/productRoute");

app.use("/cart",cartRoute);
app.use("/product",productRoute);

app.use("/images/hero", express.static("public/images/hero"));

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));