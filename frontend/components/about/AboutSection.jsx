import styles from "./About.module.css";
import { FaShippingFast, FaShoppingCart, FaPiggyBank, FaTags, FaSmile, FaHeadset } from "react-icons/fa";
import Skin from '../../src/assets/Skin.jpeg';

const AboutSection = () => {
  return (
    <div className={styles.aboutContainer}>
      {/* About Section */}
      <section id="about-head" className={styles.sectionP1}>
        <img src={Skin} alt="Skin Products" className={styles.aboutImage} />
        <div className={styles.aboutContent}>
          <h2>Who Are We?</h2>
          <p>
            We are a small business hoping to help you access everything your skin needs, from washes to moisturizers
            and serums. We aim to make your skincare journey simple and effective. Explore your favorite brands and
            discover new ones with ease.
          </p>
          <abbr title="">Male or Female, Beginner or Not, Don't worry we got your back.</abbr>

          <div className={styles.marqueeWrapper}>
            <div className={styles.marquee}>
              Check out our blog for easy-to-follow guides and information about skincare if you're just starting out.
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="feature" className={styles.sectionP1}>
        <div className={styles.featuresGrid}>
          <div className={styles.feBox}>
            <FaShippingFast className={styles.icon} />
            <h6>Free Shipping</h6>
          </div>
          <div className={styles.feBox}>
            <FaShoppingCart className={styles.icon} />
            <h6>Online Order</h6>
          </div>
          <div className={styles.feBox}>
            <FaPiggyBank className={styles.icon} />
            <h6>Save Money</h6>
          </div>
          <div className={styles.feBox}>
            <FaTags className={styles.icon} />
            <h6>Promotions</h6>
          </div>
          <div className={styles.feBox}>
            <FaSmile className={styles.icon} />
            <h6>Happy Sell</h6>
          </div>
          <div className={styles.feBox}>
            <FaHeadset className={styles.icon} />
            <h6>24/7 Support</h6>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
