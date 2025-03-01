<<<<<<< HEAD
# Skincare E-Commerce Platform

A full-stack e-commerce application specializing in premium skincare products, featuring a React frontend and Express/MongoDB backend.

## Overview

This application provides a complete shopping experience for skincare enthusiasts, with product browsing, responsive cart functionality, and a seamless checkout process.

![Skincare E-Commerce Platform](https://via.placeholder.com/800x400?text=Skincare+E-Commerce+Platform)

## Features

- Browse curated skincare products from top brands
- Interactive product display with ratings
- Fully-functional shopping cart with real-time updates
- Quantity adjustment and item removal
- Automatic price calculation with shipping
- Responsive design for all devices
- Product filtering by category

## Tech Stack

### Frontend
- **React.js**: UI component library
- **CSS Modules**: For component-scoped styling
- **React Icons**: Icon components (FaStar, FaShoppingCart, FaTimesCircle)
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-Origin Resource Sharing support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/muthonijulie/Ecommerce21.git
cd Ecommerce21
```

2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
   
Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skincare-ecommerce
```

## Usage

### Start the Backend Server

```bash
cd backend
nodemon server
```

The server will start on port 5000 (or the port specified in your .env file).

### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The React development server will start, typically on port 5173.

## Database Schema

### Product Schema
```javascript
const productSchema = new mongoose.Schema({
  brand: String,
  name: String,
  price: Number,
  image: String,
  rating: { type: Number, default: 4 },
  category: String
});
```

### Cart Schema
```javascript
const cartSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
});
```

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get a specific product |
| GET | `/products/category/:category` | Get products by category |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | Get cart contents |
| POST | `/cart` | Add product to cart |
| PUT | `/cart/:id` | Update product quantity |
| DELETE | `/cart/:id` | Remove product from cart |
| DELETE | `/cart` | Clear entire cart |

## Shopping Cart Functionality

The shopping cart provides a complete shopping experience with:

- Real-time cart updates
- Quantity adjustments via number input
- Easy item removal
- Automatic subtotal calculation
- Shipping cost addition
- Total price calculation
- "Proceed to Checkout" functionality

## Sample Products

The application includes a variety of premium skincare products including:

### Sunscreens
- Nivea Hydrating Sunscreen (3,500/=)
- ThankYou Farmer Safe Sun Fluid (3,500/=)
- SpeickSun Matte Sun Block (3,500/=)
- IsnTree Toning Sun Cream (3,500/=)
- Rebornfeel Daily Mild Sunscreen (3,900/=)

### Full Skincare Sets
- Rebornfeel Full Skincare Set (15,000/=)
- Cloque Lavender Set (13,750/=)
- Fenty Skin AM + PM Skincare Essentials (25,000/=)
- Maaemo Organic Skincare Set (20,000/=)
- Loved Organic Skincare Set (27,500/=)
- Yvnanza.Grape Full Set (20,000/=)

### Toners & Masks
- Bonatical Kinetics Face Mask (4,500/=)
- Benton Deep Green Tea Toner (3,800/=)
- Herbivore Jasmine Tea Toner (3,700/=)
- IsnTree Hydrating Toner (3,600/=)

## Frontend Structure

```
src/
├── assets/
│   ├── products/     # Product images
│   └── Shop/         # Shop layout images
├── components/
│   ├── Product/      # Product display components
│   │   └── Product.module.css
│   └── Cart/         # Shopping cart components
│       └── Cart.module.css
└── styles/
    └── modules/      # Additional CSS modules
```

## Component Overview

### Product Display (FeaturedProducts.js)
- Displays product grid with images, names, brands, and prices
- Star ratings for each product
- "Add to Cart" functionality

### Shopping Cart (CartSection.js)
- Table view of cart items
- Remove item functionality
- Quantity adjustment
- Price calculations
- Checkout button

## Styling

The application uses CSS Modules for component-scoped styling with:
- Responsive design for mobile and desktop
- Clean, modern aesthetic
- Focused on product presentation

## Future Features

- User authentication and accounts
- Order history and tracking
- Wishlist functionality
- Advanced filtering and search
- Payment gateway integration (Mpesa, Visa, Mastercard)
- Product reviews and ratings
- Admin dashboard for inventory management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)

## Acknowledgments

- All product images and brands are used for demonstration purposes only
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 4c280db (updated frontend files)
