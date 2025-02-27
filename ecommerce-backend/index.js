const express=require('express');
const app=express();
require("dotenv").config();
const logger=require("./middleware/logger");
const cors=require('cors');

const mongodb_connection=require('mongoose');

const Product=require('./Models/Product');

const port_number=process.env.PORT || 5000;

mongodb_connection.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB is connected successfully'))
.catch(err=>console.log("There is a connection error",err))

app.use(logger);
app.use(cors());
app.use(express.json({limit:"10mb"}));

app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.send("E-commerce website");
})

const productRoute=require("./routes/productRoutes");

app.use("/products",productRoute);

// Global Error Handler
function errorHandler(err, req, res, next) {
    console.error('Error occurred:', err.stack); 

    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: errorMessage,
    });
}

//Attaches the error handler AFTER all routes
app.use(errorHandler);

app.listen(port_number,()=>{
    console.log(`Server is running on http://localhost:${port_number}`);
})