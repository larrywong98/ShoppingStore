const express = require("express");
const app = express();
const router = require("./router");
const PORT = 8080;

// const bodyparser=require("body-parser");
// app.use(bodyparser.urlencoded({extended:true}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// 根目录 npm install --save cors
// const cors=require("cors");
// app.use(cors());

app.use("/api", router);


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
