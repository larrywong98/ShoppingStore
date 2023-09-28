const express = require("express");
const router = express.Router();

const User = require("./config");

// npm install validator --save
var validator = require("validator");

//npm install --save lodash
const isEmpty = require("lodash/isEmpty");

const validInput = (data) => {
    let err = {};
    if (validator.isEmpty(data.username)) {
        err.username = "empty username!"
    }
    if (!validator.isEmail(data.email)) {
        err.email = "invalid email!"
    }
    if (validator.isEmpty(data.password)) {
        err.password = "empty password!"
    }
    if (!validator.equals(data.password, data.passwordConfirmation)) {
        err.passwordConfirmation = "different passwords!"
    }
    return {
        isValid: isEmpty(err), err
    }
}


router.post("/register", async (req, res) => {
    console.log(req.body);
    const { isValid, err } = validInput(req.body);
    if (!isValid) {
        console.log(err);
        res.status(400).json(err);
    }
    else {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        const newUser = await User.create(userData);
        console.log(1010,newUser);
        // res.status(200).json(newUser);
        // newUser.save((err) => {
        //     if (err) {
        //         console.error('Error saving user data to MongoDB:', err);
        //     } else {
        //         console.log('User data saved to MongoDB');
        //     }
        // });


        res.send({
            msg: "success"
        })
    }
})

module.exports = router;

