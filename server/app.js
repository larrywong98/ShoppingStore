import express from "express";
import cors from "cors";
import { Product, Cart } from "./models/schema.js";
import md5 from "md5";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import multer from "multer";
const upload = multer({ dest: "public/resources/" });

app.get("/", (req, res) => {
  res.json("Home page");
});

const generateString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
app.post("/product/create", upload.single("file"), async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  try {
    const newProduct = new Product({
      id: md5(generateString()),
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

app.put("/product/edit/:productId", upload.single("file"), async (req, res) => {
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
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).send({ status: err.message });
  }

  // console.log(newDoc);
});

app.post("/uploadImage", upload.single("file"), (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  res.json({ name: req.file.filename });
});

app.get("/products", async (req, res) => {
  const response = Product.find();
  const products = await response;
  res.json(products);
});

app.get("/cart/:name", async (req, res) => {
  const cartData = await Cart.findOne({ name: req.params.name });
  res.status(200).json(cartData);
});

app.listen(4000, () => {
  console.log("Server running on 4000!");
});
