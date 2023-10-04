import mongoose from "mongoose";
import { Product, User, Cart} from "../models/schema.js";
import products from "./products.js";

const uri =
  "mongodb+srv://quying333:rHIuqcPqD98WUaS6@cluster0.0kmc57i.mongodb.net/?retryWrites=true&w=majority";
// Connect to your MongoDB Cloud database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Cloud!");
  })
  .catch((error) => {
    console.error(error);
  });

const collections = [ Product, User, Cart];

Promise.all(collections.map((collection) => collection.deleteMany()))
  .then((results) => {
    console.log(`${results.length} collections deleted`);
    const promises = [];

    products.forEach((product) => {
      product.timestamp = Date.now().toString().slice(0, 10);
      const data = new Product(product);
      promises.push(data.save());
    });

    return Promise.all(promises);
  })
  .then(() => {
    console.log("All data saved to MongoDB Cloud!");
  })
  .catch((error) => {
    console.error(error);
  });

