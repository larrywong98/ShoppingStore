import express from "express";
import cors from "cors";
import { Product } from "./models/schema.js";

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json("Home page");
});

app.get("/products", async (req, res) => {
  const response = Product.find();
  const products = await response;
  res.json(products);
});

app.listen(4000, () => {
  console.log("Server running on 4000!");
});
