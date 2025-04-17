const moment=require("moment");
const express=require("express");
const router=express.Router();
const http =require("http");
const request=require("request");
const https =require("https");
const Payment = require("../Model/Payment");




router.post("/stkpush", (req, res) => {
  
  let phoneNumber = req.body.phoneNumber;
  const amount = req.body.amount;

  if (phoneNumber.startsWith("0")) {
    phoneNumber = "254" + phoneNumber.slice(1);
  }
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = Buffer.from(
    "174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2c2c5c7c" + timestamp
  ).toString("base64");

  getAccessToken().then((accessToken) => {
    request.post(
      {
        url: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        json: {
          BusinessShortCode: "174379",
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: "174379",
          PhoneNumber: phoneNumber,
          CallBackURL: "https://5b6e-197-248-38-31.ngrok-free.app/payment/callback",
          AccountReference: "GlowCart",
          TransactionDesc: "Mpesa Daraja API stk push",
        },
      },
      (error, response, body) => {
        if (error) {
          console.error("Error during STK Push:", error);
          return res.status(500).json({ error: "Failed to initiate STK Push" });
        }

        console.log("Request is successful. Please enter MPESA pin.");
        res.status(200).json(body);
      }
    );
  }).catch((err) => {
    console.error("Access token error:", err);
    res.status(500).json({ error: "Access token fetch failed" });
  });
});
router.get("/home",(req,res)=>{
    res.json({message:"Welcome to the payment home page"});

});
router.get("/access_token",(req,res)=>{
    getAccessToken()
    .then((accessToken)=>{
        res.json("Access token is:"+accessToken);
    })
    .catch((error) => {
            console.error(error);
            res.status(500).send("Failed to fetch access token");
        });
    });
    

function getAccessToken(){
    const consumer_key="z20NFw1rcxc98hm0N3fxL84YenbkuLtGXbXzAMoh4iBBOSh2";
    const consumer_secret="6ILuhlrIdH3VbAg7kvYGiJIgPA2KCMDCngM93F2cJATgvdygIBHqVwfmPprMU2Kc";
    const auth=
    Buffer.from(consumer_key+":"+consumer_secret).toString("base64");
     
    const options = {
        hostname: 'sandbox.safaricom.co.ke',
        path: '/oauth/v1/generate?grant_type=client_credentials',
        method: 'GET',
        headers: {
            Authorization: `Basic ${auth}`//spacing
        }
    };
    return new Promise((resolve,reject)=>{

    const req = https.request(options, function(res) {//used https.request instead of http.request since its giving an error on the server
        let data = '';

        res.on('data', function(chunk) {
            data += chunk;
        });

        res.on('end', function() {
            const response = JSON.parse(data);
            if(response.access_token){
             resolve(response.access_token);
    }else{
        reject(new Error('Failed to fetch access token'));
    }
});
    });

    req.on('error',(error)=>{
        reject(error);
    });

    req.end();
});
}
router.post("/callback", (req, res) => {
  console.log("STK PUSH CALLBACK");

  // Send an immediate response to Safaricom
  res.status(200).json({ message: "Callback received successfully" });

  // Process the callback data
  const merchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
  const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
  const resultCode = req.body.Body.stkCallback.ResultCode;
  const resultDesc = req.body.Body.stkCallback.ResultDesc;

  // Check if the transaction was successful
  if (resultCode === 0) {
    const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata;
    const amount = callbackMetadata.Item[0].Value;
    const mpesaReceiptNumber = callbackMetadata.Item[1].Value;
    const transactionDate = callbackMetadata.Item[3].Value;
    const phoneNumber = callbackMetadata.Item[4].Value;

    console.log("Payment successful:", {
      merchantRequestID,
      checkoutRequestID,
      resultCode,
      resultDesc,
      amount,
      mpesaReceiptNumber,
      transactionDate,
      phoneNumber,
    });

    // Save the data to the database
    const payment = new Payment({
      merchantRequestID,
      checkoutRequestID,
      resultCode,
      resultDesc,
      amount,
      mpesaReceiptNumber,
      transactionDate: new Date(
        transactionDate.toString().replace(
          /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
          "$1-$2-$3T$4:$5:$6Z"
        )
      ), // Convert Safaricom's timestamp to ISO format
      phoneNumber,
    });

    payment.save((err) => {
      if (err) {
        return console.log("Error saving callback data:", err);
      }
      console.log("STK Push callback saved successfully");
    });
  } else {
    console.log("Payment failed:", resultDesc);

    // Save failed transaction details
    const payment = new Payment({
      merchantRequestID,
      checkoutRequestID,
      resultCode,
      resultDesc,
    });

    payment.save((err) => {
      if (err) {
        return console.log("Error saving failed transaction:", err);
      }
      console.log("Failed transaction saved successfully");
    });
  }
});
module.exports=router;
