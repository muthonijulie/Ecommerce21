const moment=require("moment");
const express=require("express");
const router=express.Router();

router.post("/stkpush",(req,res)=>{
    const {amount,phoneNumber}=req.body;
    console.log("Amount:",amount);
    console.log("Phone Number:",phoneNumber);
    res.json({message:"Payment initiated successfully"});
    if (phoneNumber.startsWith("+254")) {
        phoneNumber = phoneNumber.replace("+254", "0");
    }
    getAccessToken()
    .then((accessToken)=>{
        const url="https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        auth=`Bearer ${accessToken}`;
        const timestamp=moment().format("YYYYMMDDHHmmss");
        const password=Buffer.from(//removed new
            "174379"+
            "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
            +timestamp
        ).toString("base64");
        request({
            url:url,
            method:"POST",
            headers:{
                Authorization:auth,

            },
            json:{
                BusinessShortCode:"174379",
                Password:password,
                Timestamp:timestamp,
                TransactionType:"CustomerPayBillOnline",
                Amount:amount,
                PartyA:phoneNumber,
                PartyB:"174379",
                PhoneNumber:phoneNumber,
                CallBackURL:"https://mydomain.com/Glow",
                AccountReference:"GlowCart",
                TransactionDesc:"Mpesa Daraja API stk push",
            
    
        },
        },
    function(error,response,body){
        if(error){
            console.log(error);

        }else{
            console.log(response.data);
            res.status(200).json({
                message:"Request is successful. Please enter MPESA pin",
                status:true,
            });
        }
    }
        );
    })
    .catch((error) => {//ensured that error is more descriptive
            console.error(error);
            res.status(500).send("Failed to fetch access token");
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
    new Buffer.from(consumer_key+":"+consumer_secret).toString("base64");
     
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
router.post("/api/callback", (req, res) => {
  console.log("STK PUSH CALLBACK");
  const merchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
  const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
  const resultCode = req.body.Body.stkCallback.ResultCode;
  const resultDesc = req.body.Body.stkCallback.ResultDesc;
  const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata;
  const amount = callbackMetadata.Item[0].Value;
  const mpesaReceiptNumber = callbackMetadata.Item[1].Value;
  const transactionDate = callbackMetadata.Item[3].Value;
  const phoneNumber = callbackMetadata.Item[4].Value;

  console.log("MerchantRequestID:", merchantRequestID);
  console.log("CheckoutRequestID:", checkoutRequestID);
  console.log("ResultCode:", resultCode);
  console.log("ResultDesc:", resultDesc);
  
  console.log("Amount:", amount);
  console.log("MpesaReceiptNumber:", mpesaReceiptNumber);
  console.log("TransactionDate:", transactionDate);
  console.log("PhoneNumber:", phoneNumber);

  var json = JSON.stringify(req.body);
  fs.writeFile("stkcallback.json", json, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Stk push call back saved successfully");
  });
});


module.exports=router;
