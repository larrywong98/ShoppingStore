import express from "express";
import { User } from "../models/schema.js";
import jwt from "jsonwebtoken";
import { generateMD5 } from "../utils/generateMD5.js";
import { auth } from "../utils/auth.js";
import md5 from "md5";

const router = express.Router();

router.get("/password/update", async (req, res) => {
  res.json({ status: "ok" });
});

router.post("/token", async (req, res) => {
  try {
    const { name, pwd } = req.body;
    const user = await User.findOne({ userName: name, password: pwd });
    if (!user) {
      res.json({ status: "unauthorized" });
      return;
    }
    const payload = {
      user: {
        id: user.userId,
        name: user.userName,
        password: user.password,
        admin: user.admin,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ status: "ok", name: name, token: token });
  } catch (err) {
    res.json({ status: err.message });
  }
});

router.post("/signin", auth, (req, res) => {
  res.json({
    status: "ok",
    id: req.user.id,
    name: req.user.name,
    admin: req.user.admin,
  });
});
router.post("/signup", async (req, res) => {
  try {
    const exist = await User.findOne({ userName: req.body.userName });
    if (exist) {
      res.json({ status: "exist" });
      return;
    }

    const newUser = User({
      userId: md5(generateMD5()),
      userName: req.body.userName,
      password: req.body.pwd,
      admin: false,
    });
    const success = await newUser.save();
    if (!success) res.json({ status: "create failed" });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: err.message });
  }
});

export default router;
