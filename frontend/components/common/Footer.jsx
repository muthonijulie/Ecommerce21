
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa";
import styles from "./Footer.module.css";
import Glow from "../../src/assets/Glow.png";
import Play from "../../src/assets/footer/Play.jpg"
import Pay from "../../src/assets/footer/Pay.png"
import App from "../../src/assets/footer/App.jpg"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.col}>
        <img className={styles.logo} src={Glow} alt="Logo" />
        <h4>Contact</h4>
        <p><strong>Address: </strong>93/4 Yellow Brick Lane</p>
        <p><strong>Phone: </strong>+254706213608</p>
        <p><strong>Hours: </strong>09:00 - 18:00, Mon - Sat</p>
        <div className={styles.follow}>
          <h4>Follow Us</h4>
          <div className={styles.iconContainer}>
            <FaFacebookF className={styles.icon} />
            <FaTwitter className={styles.icon} />
            <FaInstagram className={styles.icon} />
            <FaPinterest className={styles.icon} />
          </div>
        </div>
      </div>
      
      <FooterColumn title="About" links={["About Us", "Delivery Information", "Privacy Policy", "Terms & Conditions", "Contact Us"]} />
      <FooterColumn title="My Account" links={["Sign In", "View Cart", "My Wishlist", "Track My Order", "Help"]} />
      
      <div className={styles.col}>
        <h4>Install App</h4>
        <p>From App Store or Google Store</p>
        <div className={styles.row}>
          <img src={App} alt="App Store" />
          <img style={{height:"30px"}} src={Play} alt="Google Play" />
        </div>
        <p>Secure Payment Gateways</p>
        <img src={Pay}alt="Payment Methods" />
      </div>

      <div className={styles.copyright}>
        <p>&copy; 2025. All rights reserved</p>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => {
  return (
    <div className={styles.col}>
      <h4>{title}</h4>
      {links.map((link, index) => (
        <a key={index} href="#">{link}</a>
      ))}
    </div>
  );
};

export default Footer;
