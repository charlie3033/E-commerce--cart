const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItem');
const Product = require('../models/product');

router.post("/", async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    let total = 0;

    // Fetch product data and calculate total
    for (const item of cartItems) {
      const prod = await Product.findById(item.productId);

      if (!prod) {
        return res.status(400).json({ error: "Invalid product in cart" });
      }

      const price = Number(prod.price);
      const qty = Number(item.qty);

      total += price * qty;
    }

    const receipt = {
      id: Date.now(),
      total,
      name,
      email,
      timestamp: new Date().toISOString()
    };

    // ✅ clear cart (optional)
    await CartItem.deleteMany({});

    res.json({ success: true, receipt });

  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Checkout failed" });
  }
});


module.exports = router;