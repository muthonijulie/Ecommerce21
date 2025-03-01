import { useState } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import styles from "./FeaturedProducts.module.css";
import CartConfirmation from "../shop/CartConfirmation"; // Import CartConfirmation component

import NiveaSunscreen from '../../src/assets/products/Nivea Sunscreen.jpeg';
import ThankYouFarmer from '../../src/assets/products/Thank You Farmer.jpg';
import SpeickSun from '../../src/assets/products/Speick Sun.jpg';
import YamRootMilk from '../../src/assets/products/Yam Root Milk.jpg';
import Rebornfeel from '../../src/assets/products/Rebornfeel.jpeg';
import Cloque from '../../src/assets/products/Cloque.jpeg';
import FentySkin from '../../src/assets/products/FentySkin.jpeg';
import Maaemo from '../../src/assets/products/Maaemo.jpeg';
import Beijing from '../../src/assets/Shop/Beijing.jpeg';
import Benton from '../../src/assets/Shop/Benton.jpeg';

const products = [
  { id: 1, img: NiveaSunscreen, brand: "Nivea", name: "Hydrating Sunscreen", price: 3500 },
  { id: 2, img: ThankYouFarmer, brand: "ThankYou", name: "Safe Sun Fluid", price: 3500 },
  { id: 3, img: SpeickSun, brand: "SpeickSun", name: "Matte Sun Block", price: 3500 },
  { id: 4, img: YamRootMilk, brand: "IsnTree", name: "Toning Sun Cream", price: 3500 },
  { id: 5, img: Rebornfeel, brand: "Rebornfeel", name: "Full Skincare Set", price: 15000 },
  { id: 6, img: Cloque, brand: "Cloque", name: "Lavender Set", price: 13750 },
  { id: 7, img: FentySkin, brand: "Fenty Skin", name: "AM + PM Skincare Essentials", price: 25000 },
  { id: 8, img: Maaemo, brand: "Maaemo", name: "Organic Skincare Set", price: 20000 },
  { id: 9, img: Beijing, brand: "Bonatical Kinetics", name: "Face Mask", price: 4500 },
  { id: 10, img: Benton, brand: "Benton", name: "Deep Green Tea Toner", price: 3800 },
];

const ProductCard = ({ id, img, brand, name, price }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const addToCart = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/cart", {
        productId: id,
        name,
        price,
        image: img,
      });
      setAddedProduct({ img, name, price });
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.pro}>
        <img src={img} alt={name} />
        <div className={styles.des}>
          <span>{brand}</span>
          <h5>{name}</h5>
          <div className={styles.star}>
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} color="rgb(243, 181, 25)" size={12} />
            ))}
          </div>
          <h4>{price}/=</h4>
        </div>
        <button onClick={addToCart} className={styles.cartButton} disabled={loading}>
          {loading ? "Adding..." : <FaShoppingCart className={styles.cart} />}
        </button>
      </div>
      <CartConfirmation show={showConfirmation} product={addedProduct} onClose={() => setShowConfirmation(false)} />
    </>
  );
};

const FeaturedProducts = () => {
  return (
    <section className={styles.sectionP1}>
      <div className={styles.proContainer}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
