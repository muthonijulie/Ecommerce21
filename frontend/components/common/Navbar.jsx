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
          <Link to="/" className={location.pathname === "/" ? styles.active : ""} onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" className={location.pathname === "/shop" ? styles.active : ""} onClick={() => setIsOpen(false)}>
            Shop
          </Link>
        </li>
        <li>
          <Link to="/blog" className={location.pathname === "/blog" ? styles.active : ""} onClick={() => setIsOpen(false)}>
            Blog
          </Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === "/about" ? styles.active : ""} onClick={() => setIsOpen(false)}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className={location.pathname === "/contact" ? styles.active : ""} onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </li>
        <li className={styles.cartIcon}>
          <Link to="/cart" className={location.pathname === "/cart" ? styles.active : ""} onClick={() => setIsOpen(false)}>
            <FaShoppingBag />
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
