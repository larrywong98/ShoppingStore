import mongoose from "mongoose";

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
<<<<<<< HEAD
// const Employee = mongoose.model("Employee", employeeSchema);
=======
>>>>>>> bdf0ad10c5356daa06ba11c687831b4f678208e0

export { Product, Cart, User };
