const express = require('express');
const router = express.Router();
const CartItem= require('../models/cartItem');
const Product = require('../models/product');


// Get full cart
router.get("/", async (req, res) => {
  const items = await CartItem.find();
  const detailed = await Promise.all(
    items.map(async (i) => {
      const prod = await Product.findById(i.productId);
      if (!prod) {
          console.log("Product missing for cart item:", i.productId);
          await CartItem.findByIdAndDelete(i._id);
          return null; 
        }
      return {
        id: i._id,
        productId: i.productId,
        name: prod.name,
        price: prod.price,
        qty: i.qty
      };
    })
  );
  const validItems = detailed.filter(i => i !== null);
  const total = validItems.reduce((sum, i) => sum + i.qty * i.price, 0);
  res.json({ items: validItems, total });
});

// Add to cart
router.post("/", async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || qty <= 0) {
    return res.status(400).json({ error: "productId & qty required" });
  }
  let item = await CartItem.findOne({ productId });
  if (item) {
    item.qty += qty;
    await item.save();
  } else {
    item = await CartItem.create({ productId, qty });
  }
  res.json({ success: true, item });
});

// Remove from cart
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await CartItem.findByIdAndDelete(id);
  res.json({ success: true });
});

module.exports = router;