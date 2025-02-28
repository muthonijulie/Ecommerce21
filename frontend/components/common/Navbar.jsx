import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        <Link to="/">Cara</Link>
      </div>

      {/* Desktop Links */}
      <ul className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
        <li>
          <Link to="/" className={styles.active}>Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li className={styles.cartIcon}>
          <Link to="/cart">
            <FaShoppingBag />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Toggle Button */}
      <div className={styles.mobileMenu} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;