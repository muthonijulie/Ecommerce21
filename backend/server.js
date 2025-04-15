const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser=require("body-parser");
const request=require("request");
const paymentRoute=require("./routes/paymentRoute");
const https=require("https");
const moment=require("moment");
const app = express();
const Cart=require('./Model/Cart');
const Product=require('./Model/Product');
const Blog=require('./Model/Blog');

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/payment', paymentRoute);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));
app.get("/stkpush",(req,res)=>{
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
                Amount:100,
                PartyA:"254797565461",
                PartyB:"174379",
                PhoneNumber:"254797565461",
                CallBackURL:"https://mydomain.com/path",
                AccountReference:"GlowCart",
                TransactionDesc:"Mpesa Daraja API stk push test ",
            
    
        },
        },
    function(error,response,body){
        if(error){
            console.log(error);

        }else{
            console.log("Request is successful.Please enter MPESA pin");
            res.status(200).json(body);
        }
    }
        );
    })
    .catch((error) => {//ensured that error is more descriptive
            console.error(error);
            res.status(500).send("Failed to fetch access token");
        });
});

app.get("/registerurl",(req,res)=>{
    getAccessToken()
    .then((accessToken)=>{
        let url="https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
        let auth=`Bearer ${accessToken}`;
        request({
            url:url,
            method:"POST",
            headers:{
                Authorization:auth,
            },
            json:{
                ShortCode:"174379",
                ResponseType:"Completed",
                ConfirmationURL:"https://glow.com/confirmation",
                ValidationURL:"https://glow.com/validation",
            },
        },
    function(error,response,body){
        if(error){
            console.log(error);
            res.status(500).send("Error registering URL");//proper error handling

        }
        res.status(200).json(body)
    
}
);
    })
   
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
app.get("/confirmation",(req,res)=>{
    console.log("Confirmation URL hit");
    console.log(req.body);
    res.send("Confirmation URL hit");
});

// Add to Cart Route
const cartRoute=require("./routes/cartRoute");
const productRoute=require("./routes/productRoute");
const blogRoute=require("./routes/blogRoute");
const contactRoute=require("./routes/contactRoute");  

app.use("/cart",cartRoute);
app.use("/product",productRoute);
app.use("/blog",blogRoute);   
app.use("/contact",contactRoute);              

app.use("/images/hero", express.static("public/images/hero"));

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));