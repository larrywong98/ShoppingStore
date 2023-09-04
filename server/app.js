import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json("Home page");
});

app.listen(4000, () => {
  console.log("Server running on 4000!");
});
