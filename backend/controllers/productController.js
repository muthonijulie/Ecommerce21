const Product=require("../Model/Product")
const getProduct= async (req, res) =>{
const products = [
  {
    img: NiveaSunscreen,
    brand: "Nivea",
    name: "Hydrating Sunscreen",
    price: "3500/=",
  },
  {
    img: ThankYouFarmer,
    brand: "ThankYou",
    name: "Safe Sun Fluid",
    price: "3,500/=",
  },
  {
    img: SpeickSun,
    brand: "SpeickSun",
    name: "Matte Sun Block",
    price: "3,500/=",
  },
  {
    img: YamRootMilk,
    brand: "IsnTree",
    name: "Toning Sun Cream",
    price: "3,500/=",
  },
  {
    img: Rebornfeel,
    brand: "Rebornfeel",
    name: "Full Skincare Set",
    price: "15,000/=",
  },
  {
    img: Cloque,
    brand: "Cloque",
    name: "Lavender Set",
    price: "13,750/=",
  },
  {
    img: FentySkin,
    brand: "Fenty Skin",
    name: "AM + PM Skincare Essentials",
    price: "25,000/=",
  },
  {
    img: Maaemo,
    brand: "Maaemo",
    name: "Organic Skincare Set",
    price: "20,000/=",
  },
];
res.json(products);
}

module.exports={getProduct};