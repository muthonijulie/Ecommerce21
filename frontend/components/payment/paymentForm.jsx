import { useState, useEffect } from 'react';
import mpesaLogo from '/src/assets/M-PESA.png';
import "../payment/paymentForm.css";
// import "./Cart/cartSection.jsx"

import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  const location = useLocation();
  const paymentInfo = location.state; // Retrieve the data passed from CartSection

  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentState, setPaymentState] = useState('idle'); // idle, initiated, pending, completed, failed
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    if(!paymentInfo){
      console.error("No payment information provided.");
      window.location.href="/cart";
    }
  }, [paymentInfo]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-Kenya', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };
const validatePhoneNumber=(phoneNumber) => {
  const regex=/^254|07\d{9}$/;
  return regex.test(phoneNumber);
};
  const validateForm = () => {
    const newErrors = {};

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Kenyan phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();
  if(!validateForm())
    return;
    setIsLoading(true);
  

  try {
    const response = await fetch("http://localhost:5000/payment/stkpush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        amount: paymentInfo.total,
        reference: paymentInfo.orderId,
        accountReference: paymentInfo.accountReference,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    setPaymentState("completed");
    setTransactionData(data);
  } catch (error) {
    console.error("Error during payment:", error);
    setPaymentState("failed");
    setErrors({ payment: "Payment failed! Please try again later." });
  }

};
  return (
    <div className="payment-container">
      <div className="payment-header">
        <img src={mpesaLogo} alt="M-Pesa Logo" className="payment-logo" />
        <h2 className="payment-title">M-Pesa Payment</h2>
      </div>

      <div className="payment-body">
        <div className="payment-info">
          <div className="payment-info-row">
            <span className="payment-info-label">Order Reference</span>
            <span className="payment-info-value">{paymentInfo?.orderId || 'N/A'}</span>
          </div>
          <div className="payment-info-row">
            <span className="payment-info-label">Subtotal</span>
            <span className="payment-info-value">{formatCurrency(paymentInfo?.subtotal || 0)}</span>
          </div>
          <div className="payment-info-row">
            <span className="payment-info-label">Shipping</span>
            <span className="payment-info-value">{formatCurrency(paymentInfo?.shipping || 0)}</span>
          </div>
          <div className="payment-info-row">
            <span className="payment-info-label">Total</span>
            <span className="payment-total">{formatCurrency(paymentInfo?.total || 0)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Pay with M-Pesa'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
