import express from "express";
import cors from "cors";
import { Product } from "./models/schema.js";

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

app.post("/product/create", upload.single("file"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const newProduct = new Product({
    id: "4",
    imgPath: req.body.imgPath,
    volume: parseInt(req.body.volume),
    category: req.body.category,
    desp: req.body.desp,
    price: parseFloat(req.body.price),
    content: req.body.content,
    timestamp: Date.now().toString().slice(0, 10),
  });
  await newProduct.save();
});

app.post("/uploadImage", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({ name: req.file.filename });
});

app.get("/products", async (req, res) => {
  const response = Product.find();
  const products = await response;
  res.json(products);
});

app.listen(4000, () => {
  console.log("Server running on 4000!");
});
