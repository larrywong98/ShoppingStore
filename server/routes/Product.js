import express from "express";
import multer from "multer";
import { Product } from "../models/schema.js";
import { generateMD5 } from "../utils/generateMD5.js";
import { auth } from "../utils/auth.js";
import md5 from "md5";

const router = express.Router();
const upload = multer({ dest: "public/resources/" });

router.post("/new", auth, upload.single("file"), async (req, res) => {
  try {
    const newProduct = new Product({
      id: md5(generateMD5()),
      imgPath: req.body.imgPath,
      volume: parseInt(req.body.volume),
      category: req.body.category,
      desp: req.body.desp,
      price: parseFloat(req.body.price),
      content: req.body.content,
      timestamp: Date.now().toString().slice(0, 10),
    });
    const success = await newProduct.save();
    if (!success) res.status(200).json({ status: "create failed" });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
});

router.put(
  "/edit/:productId",
  auth,
  upload.single("file"),
  async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    // console.log(req.params.productId);
    try {
      let filter = { id: req.body.id };
      let update = {
        imgPath: req.body.imgPath,
        volume: parseInt(req.body.volume),
        category: req.body.category,
        desp: req.body.desp,
        price: parseFloat(req.body.price),
        content: req.body.content,
        timestamp: Date.now().toString().slice(0, 10),
      };
      let newDoc = await Product.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.json({ status: "ok" });
    } catch (err) {
      res.json({ status: err.message });
    }
  }
);

router.post("/image/upload", auth, upload.single("file"), (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  res.json({ name: req.file.filename });
});

router.get("/", async (req, res) => {
  const response = Product.find();
  const products = await response;
  res.json(products);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedDoc = await Product.findOneAndDelete({ id: req.params.id });
    // {$pull : {"someArray.0.someNestedArray" : {"name":"delete me"}}}
    // const deletedAdded = await Cart.update({
    //   $pull: { addedProducts: { $elemMatch: { $eq: req.params.id } } },
    // });
    // console.log(deletedAdded);
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "not ok" });
  }
});

export default router;
