import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa';

const CartConfirmation = ({ show, product, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  if (!show) return null;
  
  return (
    <div className={`confirmation-overlay ${isVisible ? 'visible' : 'hiding'}`}>
      <div className="confirmation-modal">
        <div className="confirmation-icon">
          <FaCheckCircle size={40} color="#4CAF50" />
        </div>
        <div className="confirmation-content">
          <h3>Added to Cart</h3>
          {product && (
            <div className="confirmation-product">
              <img src={product.img} alt={product.name} className="confirmation-product-image" />
              <div className="confirmation-product-details">
                <p className="confirmation-product-name">{product.name}</p>
                <p className="confirmation-product-price">{product.price}/=</p>
              </div>
            </div>
          )}
          <div className="confirmation-actions">
            <button className="continue-shopping" onClick={onClose}>
              Continue Shopping
            </button>
            <Link to="/cart" className="view-cart">
              <FaShoppingCart size={14} style={{ marginRight: '5px' }} />
              View Cart
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .confirmation-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s;
        }
        
        .confirmation-overlay.visible {
          opacity: 1;
          visibility: visible;
        }
        
        .confirmation-overlay.hiding {
          opacity: 0;
          visibility: hidden;
        }
        
        .confirmation-modal {
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 400px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .confirmation-icon {
          margin-bottom: 15px;
        }
        
        .confirmation-content {
          width: 100%;
          text-align: center;
        }
        
        .confirmation-content h3 {
          color: #333;
          margin-bottom: 15px;
          font-size: 1.2rem;
        }
        
        .confirmation-product {
          display: flex;
          align-items: center;
          padding: 10px;
          background-color: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        
        .confirmation-product-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 5px;
          margin-right: 10px;
        }
        
        .confirmation-product-details {
          text-align: left;
        }
        
        .confirmation-product-name {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .confirmation-product-price {
          color: #555;
        }
        
        .confirmation-actions {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 15px;
        }
        
        .continue-shopping, .view-cart {
          padding: 8px 15px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .continue-shopping {
          background-color: #f8f9fa;
          color: #333;
        }
        
        .continue-shopping:hover {
          background-color: #e9ecef;
        }
        
        .view-cart {
          background-color: #088178;
          color: white;
          display: flex;
          align-items: center;
          text-decoration: none;
          justify-content: center;
        }
        
        .view-cart:hover {
          background-color: #066a63;
        }
      `}</style>
    </div>
  );
};

export default CartConfirmation;
