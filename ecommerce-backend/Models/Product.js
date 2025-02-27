const mongodb_connection=require('mongoose');
//creates the collection,Product
const ProductSchema=new mongodb_connection.Schema({
    Product:{type:String,required:true},
    Description:{type:String,required:true},
    Price:{type:Number,required:true},
    Image:{type:String}
},{timestamps:true});


module.exports=mongodb_connection.model("Product",ProductSchema)