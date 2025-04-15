import { useState, useEffect } from 'react';
// import {
//   validatePhoneNumber,
//   formatPhoneNumber,
//   validateAmount,
//   formatCurrency
// } from '../utils/validation';
// import {
//   initiatePayment,
//   checkPaymentStatus,
//   getPaymentInfo
// } from '../utils/api';
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-Kenya', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
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
    fetch("https://localhost:5000/payment", {
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
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPaymentState('completed');
        setTransactionData(data);
      })
      .catch((error) => {
        console.error(error);
        setPaymentState('failed');
        setErrors({ payment: 'Payment failed!' });
      });
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
// const PaymentForm = () => {

//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentInfo, setPaymentInfo] = useState(null);
//   const [paymentState, setPaymentState] = useState('idle'); // idle, initiated, pending, completed, failed
//   const [transactionData, setTransactionData] = useState(null);

//   // Fetch payment information 
//   useEffect(() => {
//     const fetchPaymentInfo = async () => {
//       try {
//         setIsLoading(true);
//         const info = await getPaymentInfo();
//         setPaymentInfo(info);
//       } catch (error) {
//         console.error('Error fetching payment info:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPaymentInfo();
//   }, []);

//   // Poll for payment status after initiation
//   useEffect(() => {
//     let intervalId;

//     if (paymentState === 'initiated' && transactionData) {
//       intervalId = setInterval(async () => {
//         try {
//           const status = await checkPaymentStatus(transactionData.transactionId);

//           if (status.status === 'COMPLETED') {
//             setPaymentState('completed');
//             setTransactionData(prev => ({ ...prev, ...status }));
//             clearInterval(intervalId);
//           } else if (status.status === 'FAILED') {
//             setPaymentState('failed');
//             setErrors({ payment: status.message || 'Payment failed' });
//             clearInterval(intervalId);
//           }
//         } catch (error) {
//           console.error('Error checking payment status:', error);
//         }
//       }, 5000); // Check every 5 seconds
//     }

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [paymentState, transactionData]);
// //formatCurrency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-Kenya', {
//       style: 'currency',
//       currency: 'KES',
//     }).format(amount);
//   };
//   // Validate the form
//   const validateForm = () => {
//     const newErrors = {};

//     if (!phoneNumber) {
//       newErrors.phoneNumber = 'Phone number is required';
//     } else if (!validatePhoneNumber(phoneNumber)) {
//       newErrors.phoneNumber = 'Please enter a valid Kenyan phone number';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     fetch("https://localhost:5000/payment", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         phoneNumber: phoneNumber,
//         amount: paymentInfo.total,
//         reference: paymentInfo.orderId,
//         accountReference: paymentInfo.accountReference,
//       })
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setMessage('Payment successful!');
//       })
//       .catch((error) => {
//         console.error(error);
//         setMessage('Payment failed!');
//       })
//     };
    

//   // Reset the form
//   const handleReset = () => {
//     setPhoneNumber('');
//     setErrors({});
//     setPaymentState('idle');
//     setTransactionData(null);
//   };

//   // Render loading state
//   if (isLoading && !paymentInfo) {
//     return (
//       <div className="payment-container">
//         <div className="payment-body text-center p-lg">
//           <div className="loader" style={{ width: '40px', height: '40px', borderWidth: '4px' }}></div>
//           <p className="mt-md">Loading payment information...</p>
//         </div>
//       </div>
//     );
//   }

//   // Render payment success state
//   if (paymentState === 'completed') {
//     return (
//       <div className="payment-container">
//         <div className="payment-header">
//           <img src={mpesaLogo} alt="M-Pesa Logo" className="payment-logo" />
//           <h2 className="payment-title">Payment Successful</h2>
//         </div>
//         <div className="payment-success">
//           <div className="payment-success-icon">✓</div>
//           <h3 className="payment-success-title">Thank You!</h3>
//           <p className="payment-success-message">Your payment has been completed successfully.</p>

//           <div className="payment-success-details">
//             <p>
//               <span>Amount</span>
//               <strong>{formatCurrency(transactionData.amount)}</strong>
//             </p>
//             <p>
//               <span>M-Pesa Receipt</span>
//               <strong>{transactionData.mpesaReceiptNumber}</strong>
//             </p>
//             <p>
//               <span>Date</span>
//               <strong>{new Date(transactionData.timestamp).toLocaleString()}</strong>
//             </p>
//             <p>
//               <span>Phone Number</span>
//               <strong>{transactionData.phoneNumber}</strong>
//             </p>
//             <p>
//               <span>Reference</span>
//               <strong>{transactionData.reference}</strong>
//             </p>
//           </div>

//           <button
//             className="payment-button mt-md"
//             onClick={() => window.location.href = '/'}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Render waiting for payment confirmation
//   if (paymentState === 'initiated') {
//     return (
//       <div className="payment-container">
//         <div className="payment-header">
//           <img src={mpesaLogo} alt="M-Pesa Logo" className="payment-logo" />
//           <h2 className="payment-title">Payment Initiated</h2>
//           <p className="payment-subtitle">Complete the payment on your phone</p>
//         </div>
//         <div className="payment-body text-center">
//           <div className="payment-instructions">
//             <h4>Payment Instructions:</h4>
//             <ol>
//               <li>You will receive a prompt on your phone ({transactionData.phoneNumber}).</li>
//               <li>Enter your M-Pesa PIN to complete the payment.</li>
//               <li>Wait for confirmation SMS from M-Pesa.</li>
//             </ol>
//           </div>

//           <div className="loader" style={{ width: '30px', height: '30px', borderWidth: '3px', borderColor: 'rgba(57, 181, 74, 0.3)', borderTopColor: 'var(--mpesa-green)' }}></div>
//           <p className="mt-md mb-md">Waiting for payment confirmation...</p>

//           <button
//             className="payment-button"
//             onClick={handleReset}
//             style={{ backgroundColor: 'var(--gray-600)' }}
//           >
//             Cancel Payment
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Render main payment form
//   return (
//     <div className="payment-container">
//       <div className="payment-header">
//         <img src={mpesaLogo} alt="M-Pesa Logo" className="payment-logo" />
//         <h2 className="payment-title">M-Pesa Payment</h2>
//         <p className="payment-subtitle">Fast, Secure, Convenient</p>
//       </div>

//       <div className="payment-body">
//         {errors.payment && (
//           <div className="payment-instructions" style={{ borderLeftColor: 'var(--error)', backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
//             <p style={{ color: 'var(--error)' }}>{errors.payment}</p>
//           </div>
//         )}

//         <div className="payment-info">
//           <div className="payment-info-row">
//             <span className="payment-info-label">Order Reference</span>
//             <span className="payment-info-value">{paymentInfo?.orderId || 'N/A'}</span>
//           </div>
//           <div className="payment-info-row">
//             <span className="payment-info-label">Subtotal</span>
//             <span className="payment-info-value">{formatCurrency(paymentInfo?.subtotal || 0)}</span>
//           </div>
//           <div className="payment-info-row">
//             <span className="payment-info-label">Shipping</span>
//             <span className="payment-info-value">{formatCurrency(paymentInfo?.shipping || 0)}</span>
//           </div>
//           <div className="payment-info-row">
//             <span className="payment-info-label">Tax</span>
//             <span className="payment-info-value">{formatCurrency(paymentInfo?.tax || 0)}</span>
//           </div>
//           <div className="payment-info-row" style={{ borderTop: '1px solid var(--gray-300)', marginTop: 'var(--spacing-xs)', paddingTop: 'var(--spacing-sm)' }}>
//             <span className="payment-info-label" style={{ fontSize: 'var(--font-size-md)', fontWeight: 600 }}>Total</span>
//             <span className="payment-total">{formatCurrency(paymentInfo?.total || 0)}</span>
//           </div>
//         </div>

//         <div className="payment-instructions">
//           <h4>Payment Information</h4>
//           <p>Complete your payment using M-Pesa. Enter your phone number below and we'll send you a payment prompt.</p>
//           <p>Business Number: <strong>{paymentInfo?.payBillNumber}</strong></p>
//           <p>Account: <strong>{paymentInfo?.accountReference}</strong></p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
//             <div className="phone-input-container">
//               <div className="country-code">+254</div>
//               <input
//                 type="text"
//                 id="phoneNumber"
//                 className={`form-input phone-input ${errors.phoneNumber ? 'error' : ''}`}
//                 placeholder="7XXXXXXXX"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//             </div>
//             {errors.phoneNumber && (
//               <div className="error-message">{errors.phoneNumber}</div>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="payment-button"
//             disabled={isLoading || paymentState === 'processing'}
//           >
//             {isLoading || paymentState === 'processing' ? (
//               <>
//                 <span className="loader"></span>
//                 Processing Payment...
//               </>
//             ) : (
//               <>Pay with M-Pesa</>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;
