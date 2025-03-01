import { useState, useEffect } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import styles from "./Product.module.css";
import CartConfirmation from "./CartConfirmation"; // Import the CartConfirmation component

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
import BonaticalKinetics from '../../src/assets/Shop/BonaticalKinetics.jpeg';
import Herbivore from '../../src/assets/Shop/Herbivore.jpeg';
import IsnTree from '../../src/assets/Shop/IsnTree.jpeg';
import Loved from '../../src/assets/Shop/Loved.jpeg';
import Rebornfeel2 from '../../src/assets/Shop/Rebornfeel.jpeg';
import YvnanzaGrape from '../../src/assets/Shop/YvnanzaGrape.jpeg';

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
  { id: 11, img: BonaticalKinetics, brand: "BonaticalKinetics", name: "Face Mask", price: 4200 },
  { id: 12, img: Herbivore, brand: "Herbivore", name: "Jasmine Tea Toner", price: 3700 },
  { id: 13, img: IsnTree, brand: "IsnTree", name: "Hydrating Toner", price: 3600 },
  { id: 14, img: Loved, brand: "Loved", name: "Organic Skincare Set", price: 27500 },
  { id: 15, img: Rebornfeel2, brand: "Rebornfeel", name: "Daily Mild Sunscreen", price: 3900 },
  { id: 16, img: YvnanzaGrape, brand: "Yvnanza.Grape", name: "Full set", price: 20000 },
];

const ProductCard = ({ id, img, brand, name, price }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const addToCart = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/cart", {
        productId: id,
        name,
        price,
        image: img,
      });

      // Instead of alert, show the confirmation modal
      setAddedProduct({ img, name, price });
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
    setLoading(false);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
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
      
      {/* Add the confirmation component */}
      <CartConfirmation 
        show={showConfirmation} 
        product={addedProduct} 
        onClose={handleCloseConfirmation} 
      />
    </>
  );
};

const FeaturedProducts = () => {
  return (
    <>
      <section className={styles.pageHeader} style={{ backgroundImage: `url(${NiveaSunscreen})` }}>
        <h2>#SunCare</h2>
        <p>Stay protected with our top picks</p>
      </section>
      <section className={styles.sectionP1}>
        <div className={styles.proContainer}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;