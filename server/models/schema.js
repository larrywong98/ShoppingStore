import mongoose from "../config/connect.js";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    id: String,
    imgPath: String,
    desp: String,
    price: Number,
    timestamp: String,
  },
  {
    collection: "Product",
  }
);

// const employeeSchema = new Schema(
//   {
//     firstName: String,
//     lastName: String,
//     company: { type: Schema.Types.ObjectId, ref: "Company" },
//     startDate: Date,
//     jobTitle: String,
//     resigned: Boolean,
//     salary: Number,
//     _manager: [this],
//   },
//   {
//     collection: "Employee",
//   }
// );
const Product = mongoose.model("Product", productSchema);
// const Employee = mongoose.model("Employee", employeeSchema);
const productImageDirUrl = "http://127.0.0.1:4000/resources/";
const products = [
  {
    id: "11",
    imgPath: productImageDirUrl + "1.png",
    desp: "Apple iPhone 15, 256G",
    price: 120.0,
    timestamp: "1694993878",
  },
  {
    id: "1",
    imgPath: productImageDirUrl + "1.png",
    desp: "Apple iPhone 15, 256G",
    price: 120.0,
    timestamp: "1694993878",
  },
  {
    id: "2",
    imgPath: productImageDirUrl + "2.png",
    desp: "Apple iPhone 15, 256G",
    price: 500.0,
    timestamp: "1693957078",
  },

  {
    id: "3",
    imgPath: productImageDirUrl + "3.png",
    desp: "Apple iPhone 13, 256G",
    price: 220.0,
    timestamp: "1692142678",
  },
  {
    id: "4",
    imgPath: productImageDirUrl + "4.png",
    desp: "Apple iPhone 13, 256G",
    price: 750.0,
    timestamp: "1691192278",
  },
  {
    id: "5",
    imgPath: productImageDirUrl + "5.png",
    desp: "Apple iPhone 13, 256G",
    price: 430.0,
    timestamp: "1689637078",
  },
  {
    id: "6",
    imgPath: productImageDirUrl + "6.png",
    desp: "Apple iPhone 13, 256G",
    price: 120.0,
    timestamp: "1688513878",
  },
  {
    id: "7",
    imgPath: productImageDirUrl + "7.png",
    desp: "Apple iPhone 13, 256G",
    price: 120.0,
    timestamp: "1686440278",
  },
  {
    id: "8",
    imgPath: productImageDirUrl + "8.png",
    desp: "Apple iPhone 13, 256G",
    price: 120.0,
    timestamp: "1683329878",
  },
  {
    id: "9",
    imgPath: productImageDirUrl + "9.png",
    desp: "Apple iPhone 15, 256G",
    price: 120.0,
    timestamp: "1682552278",
  },
  {
    id: "10",
    imgPath: productImageDirUrl + "10.png",
    desp: "Apple iPhone 15, 256G",
    price: 120.0,
    timestamp: "1681861078",
  },
];

products.forEach(async (product) => {
  const record = new Product(product);
  await record.save();
  console.log("Products initiated");
});

const product = new Product({
  id: String,
  imgPath: String,
  desp: String,
  price: Number,
  timestamp: String,
});

export { Product };
