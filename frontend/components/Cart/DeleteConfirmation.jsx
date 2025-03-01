import React, { useState, useEffect } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const DeleteConfirmation = ({ show, product, onConfirm, onCancel }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (show) {
      setIsVisible(true);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className={`confirmation-overlay ${isVisible ? 'visible' : 'hiding'}`}>
      <div className="confirmation-modal">
        <div className="confirmation-icon">
          <FaTimesCircle size={40} color="#d9534f" />
        </div>
        <div className="confirmation-content">
          <h3>Remove Item?</h3>
          {product && (
            <div className="confirmation-product">
              <img src={product.image} alt={product.name} className="confirmation-product-image" />
              <div className="confirmation-product-details">
                <p className="confirmation-product-name">{product.name}</p>
                <p className="confirmation-product-price">{product.price}/=</p>
              </div>
            </div>
          )}
          <div className="confirmation-actions">
            <button className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button className="delete-btn" onClick={() => onConfirm(product._id)}>Remove</button>
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
        .confirmation-product {
          display: flex;
          align-items: center;
          padding: 10px;
          background-color: #f8d7da;
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
        .confirmation-actions {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 15px;
        }
        .cancel-btn, .delete-btn {
          padding: 8px 15px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .cancel-btn {
          background-color: #f8f9fa;
          color: #333;
        }
        .cancel-btn:hover {
          background-color: #e9ecef;
        }
        .delete-btn {
          background-color: #d9534f;
          color: white;
        }
        .delete-btn:hover {
          background-color: #c9302c;
        }
      `}</style>
    </div>
  );
};

export default DeleteConfirmation;
