const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  merchantRequestID: {
    type: String,
    required: true,
  },
  checkoutRequestID: {
    type: String,
    required: true,
  },
  resultCode: {
    type: Number,
    required: true,
  },
  resultDesc: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: false, // Optional, as it may not exist in failed transactions
  },
  mpesaReceiptNumber: {
    type: String,
    required: false, // Optional, as it may not exist in failed transactions
  },
  transactionDate: {
    type: Date,
    required: false, // Optional, as it may not exist in failed transactions
  },
  phoneNumber: {
    type: String,
    required: false, // Optional, as it may not exist in failed transactions
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);