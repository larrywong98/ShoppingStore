import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PWD}@cluster0.yyafoyf.mongodb.net/chuwa?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

export default mongoose;
