import mongoose from "../config/connect.js";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    id: String,
    imgPath: String,
    volume: Number,
    category: String,
    desp: String,
    price: Number,
    content: String,
    timestamp: String,
  },
  {
    collection: "Product",
  }
);

const cartSchema = new Schema(
  {
    userId: String,
    addedProducts: [{ id: String, added: Number }],
  },
  {
    collection: "Cart",
  }
);

const userSchema = new Schema(
  {
    userId: String,
    userName: String,
    password: String,
    admin: Boolean,
  },
  {
    collection: "User",
  }
);

const Product = mongoose.model("Product", productSchema);
const Cart = mongoose.model("Cart", cartSchema);
const User = mongoose.model("User", userSchema);
// const Employee = mongoose.model("Employee", employeeSchema);

export { Product, Cart, User };
