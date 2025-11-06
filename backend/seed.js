// /backend/seed/products.seed.js

const mongoose = require("mongoose");
const Product = require("./models/product"); // adjust path if needed
require("dotenv").config();

const products = [
  {
    name: "Wireless Headphones",
    price: 1999,
    description: "High-quality wireless headphones with noise cancellation.",
    image: '/images/headphones.jpg',
    category: "Electronics"
  },
  {
    name: "Smart Watch",
    price: 2499,
    description: "Fitness tracking and notification smart watch.",
    image: "/images/smartwatch.jpg",
    category: "Electronics"
  },
  {
    name: "Running Shoes",
    price: 1599,
    description: "Lightweight and durable running shoes.",
    image: "/images/shoes.jpg",
    category: "Fashion"
  },
  {
    name: "Gaming Mouse",
    price: 799,
    description: "Ergonomic RGB gaming mouse with high DPI.",
    image: "/images/mouse.jpg",
    category: "Electronics"
  },
  {
    name: "Bluetooth Speaker",
    price: 1299,
    description: "Portable speaker with powerful bass.",
    image: "/images/speaker.jpg",
    category: "Electronics"
  },
  {
    name: "Backpack",
    price: 999,
    description: "Water-resistant backpack with laptop compartment.",
    image: "/images/backpack.jpg",
    category: "Fashion"
  },
  {
    name: "Sunglasses",
    price: 699,
    description: "Stylish UV-protected sunglasses.",
    image: "/images/sunglasses.jpg",
    category: "Fashion"
  },
  {
    name: "Desk Lamp",
    price: 499,
    description: "LED study lamp with adjustable brightness.",
    image: "/images/lamp.jpg",
    category: "Home"
  },
  {
    name: "Yoga Mat",
    price: 599,
    description: "Non-slip yoga mat with soft padding.",
    image: "/images/yogamat.jpg",
    category: "Fitness"
  },
  {
    name: "Water Bottle",
    price: 299,
    description: "Stainless steel insulated water bottle.",
    image: "/images/bottle.jpg",
    category: "Fitness"
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ 10 Products inserted successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  });
