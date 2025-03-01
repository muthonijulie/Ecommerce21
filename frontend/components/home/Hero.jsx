import styles from "./Hero.module.css";
import {Link} from "react-router-dom";
import F1 from '../../src/assets/hero/F1.png'
import F2 from '../../src/assets/hero/F2.png'
import F3 from '../../src/assets/hero/F3.png'
import F4 from '../../src/assets/hero/F4.png'
import F5 from '../../src/assets/hero/F5.png'
import F6 from '../../src/assets/hero/F6.png'

const features = [
  { img: F1, text: "Free Shipping" },
  { img: F2, text: "Online Order" },
  { img: F3, text: "Save Money" },
  { img: F4, text: "Promotions" },
  { img: F5, text: "Happy Sell" },
  { img: F6, text: "24/7 Support" },
];

const FeatureBox = ({ img, text }) => (
  <div className={styles.feBox}>
    <img src={img} alt={text} />
    <h6>{text}</h6>
  </div>
);

const Hero = () => {
  return (
    <div>
      <section className={styles.hero}>
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to <span style={{color:"red"}}>70% off!</span></p>
        <Link to="/shop"><button>Shop Now</button></Link>
      </section>

      <section className={styles.feature}>
        {features.map((feature, index) => (
          <FeatureBox key={index} img={feature.img} text={feature.text} />
        ))}
      </section>
    </div>
  );
};

export default Hero;
