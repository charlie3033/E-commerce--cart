const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItem');
const Product = require('../models/product');

router.post("/", async (req, res) => {
  const { name, email, cartItems } = req.body;
  if (!name || !email || !cartItems) {
    return res.status(400).json({ error: "name, email, cartItems required" });
  }
  const receipt = {
    id: "rcpt_" + Date.now(),
    customer: { name, email },
    items: cartItems,
    timestamp: new Date(),
  };
  await CartItem.deleteMany({}); // clear cart
  res.json({ success: true, receipt });
});

module.exports = router;