import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import Glow from "../../src/assets/Glow.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation(); // Get current route

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
//className={({isActive})=> isActive ? styles.active:undefined}-active link

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(`.${styles.navLinks}`) && 
          !event.target.closest(`.${styles.mobileMenu}`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, styles]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Fetch cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/cart");
        const data = await response.json();
        setCartCount(data.length);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };
    
    fetchCartCount();
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Glow} alt="GlowCart Logo" className={styles.logoImage} />
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

      {/* Navigation Links */}
      <ul className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
        <li className={styles.closeButton}>
          <FaTimes onClick={toggleMenu} />
        </li>
        <li>
          <Link to="/shop"className={styles.active}>Shop</Link>
        </li>
        <li>
          <Link to="/blog"className={styles.active}>Blog</Link>
        </li>
        <li>
          <Link to="/about"className={styles.active}>About</Link>
        </li>
        <li>
          <Link to="/contact"className={styles.active}>Contact</Link>
        </li>
        <li className={styles.cartIcon}>
          <Link to="/cart">
          Cart
            < FaShoppingBag />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Toggle Button - only visible when menu is closed */}
      {!isOpen && (
        <div className={styles.mobileMenu} onClick={toggleMenu}>
          <FaBars />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
