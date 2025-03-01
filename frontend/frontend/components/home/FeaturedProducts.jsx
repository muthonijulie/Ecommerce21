
import { FaStar, FaShoppingCart } from "react-icons/fa";
import styles from "./FeaturedProducts.module.css";
import NiveaSunscreen from '../../src/assets/products/Nivea Sunscreen.jpeg'
import ThankYouFarmer from '../../src/assets/products/Thank You Farmer.jpg'
import SpeickSun from '../../src/assets/products/Speick Sun.jpg'
import YamRootMilk from '../../src/assets/products/Yam Root Milk.jpg'
import Rebornfeel from '../../src/assets/products/Rebornfeel.jpeg'
import Cloque from '../../src/assets/products/Cloque.jpeg'
import FentySkin from '../../src/assets/products/FentySkin.jpeg'
import Maaemo from '../../src/assets/products/Maaemo.jpeg'


const products = [
  {
    img: NiveaSunscreen,
    brand: "Nivea",
    name: "Hydrating Sunscreen",
    price: "3500/=",
  },
  {
    img: ThankYouFarmer,
    brand: "ThankYou",
    name: "Safe Sun Fluid",
    price: "3,500/=",
  },
  {
    img: SpeickSun,
    brand: "SpeickSun",
    name: "Matte Sun Block",
    price: "3,500/=",
  },
  {
    img: YamRootMilk,
    brand: "IsnTree",
    name: "Toning Sun Cream",
    price: "3,500/=",
  },
  {
    img: Rebornfeel,
    brand: "Rebornfeel",
    name: "Full Skincare Set",
    price: "15,000/=",
  },
  {
    img: Cloque,
    brand: "Cloque",
    name: "Lavender Set",
    price: "13,750/=",
  },
  {
    img: FentySkin,
    brand: "Fenty Skin",
    name: "AM + PM Skincare Essentials",
    price: "25,000/=",
  },
  {
    img: Maaemo,
    brand: "Maaemo",
    name: "Organic Skincare Set",
    price: "20,000/=",
  },
];

const ProductCard = ({ img, brand, name, price }) => {
  return (
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
        <h4>{price}</h4>
      </div>
      <a href="#">
        <FaShoppingCart className={styles.cart} />
      </a>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className={styles.sectionP1}>
      <h2>Featured Products</h2>
      <p>Get Ready for the Sun!</p>
      <div className={styles.proContainer}>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
