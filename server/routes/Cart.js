import express from "express";
import { Product, Cart } from "../models/schema.js";
import { auth } from "../utils/auth.js";

const router = express.Router();

router.get("/:userId", auth, async (req, res) => {
  const cartData = await Cart.find({ userId: req.params.userId });
  res.json(cartData);
});

router.put("/save", auth, async (req, res) => {
  try {
    const products = (await Product.find()).map((product) => product.id);
    let newCart = req.body.cart
      .filter((product) => products.includes(product.id))
      .map((product) => {
        return { id: product.id, added: product.added };
      });
    let filter = { userId: req.body.id };
    let update = { addedProducts: newCart };
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const response = await Cart.findOneAndUpdate(filter, update, options);
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "not ok" });
  }
});

router.delete("/checkout", auth, async (req, res) => {
  try {
    req.body.cart.forEach(async (product) => {
      let filter = { id: product.id };
      let update = { $inc: { volume: -product.added } };
      await Product.findOneAndUpdate(filter, update);
    });
    await Cart.findOneAndUpdate(
      { userId: req.body.userId },
      { addedProducts: [] }
    );
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "not ok" });
  }
});

export default router;
