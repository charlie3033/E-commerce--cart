const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000","https://your-frontend.vercel.app"],
  credentials:true
}));

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');

mongoose.connect('mongodb://127.0.0.1:27017/vibe_commerce')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkoutRoutes);

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
