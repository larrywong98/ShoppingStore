import express from "express";
import cors from "cors";
import { Product, Cart, User } from "./models/schema.js";
import jwt from "jsonwebtoken";
import { md5Token } from "./utils/generateMD5.js";
import { auth } from "./utils/auth.js";

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

app.get("/api/password/update", async (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/token", async (req, res) => {
  try {
    const { name, pwd } = req.body;
    const user = await User.findOne({ userName: name, password: pwd });
    if (!user) {
      res.json({ status: "unauthorized" });
      return;
    }
    const payload = {
      user: {
        id: user.userId,
        name: user.userName,
        password: user.password,
        admin: user.admin,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ status: "ok", name: name, token: token });
  } catch (err) {
    res.json({ status: err.message });
  }
});

app.post("/api/signin", auth, (req, res) => {
  res.json({
    status: "ok",
    id: req.user.id,
    name: req.user.name,
    admin: req.user.admin,
  });
});
app.post("/api/signup", async (req, res) => {
  // console.log(req.body);
  try {
    const newUser = User({
      userId: md5Token,
      userName: req.body.userName,
      password: req.body.pwd,
      admin: false,
    });
    const success = await newUser.save();
    if (!success) res.status(200).json({ status: "create failed" });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
});

app.post("/product/create", upload.single("file"), async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  try {
    const newProduct = new Product({
      id: md5Token,
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

app.post("/image/upload", upload.single("file"), (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  res.json({ name: req.file.filename });
});

app.get("/products", async (req, res) => {
  const response = Product.find();
  const products = await response;
  res.json(products);
});

app.get("/cart/:userId", async (req, res) => {
  const cartData = await Cart.find({ userId: req.params.userId });
  // console.log(req.params.userId);
  res.status(200).json(cartData);
});

app.put("/api/cart/save", async (req, res) => {
  let newCart = req.body.cart.map((product) => {
    return { id: product.id, added: product.added };
  });
  let filter = { userId: req.body.id };
  let update = { addedProducts: newCart };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const response = await Cart.findOneAndUpdate(filter, update, options);
  console.log(response);
});

app.delete("/api/cart/checkout", async (req, res) => {
  // console.log(req.body);
  req.body.forEach(async (product) => {
    let filter = { id: product.id };
    let update = { $inc: { volume: -product.added } };
    const response = await Product.findOneAndUpdate(filter, update);
    res.json({ status: "ok" });
  });
});

app.listen(4000, () => {
  console.log("Server running on 4000!");
});
