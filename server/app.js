import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json("Home page");
});

import userRoute from "./routes/User.js";
import productRoute from "./routes/Product.js";
import cartRoute from "./routes/Cart.js";

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);

app.listen(4000, () => {
  console.log("Server running on 4000!");
});
