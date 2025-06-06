const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

// signup an user
authRouter.post("/signup", async (req, res) => {
  try {
    // Validations of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const isUserAlreadyExists = await User.find({ emailId: req.body.emailId });
    if (isUserAlreadyExists.length > 0) {
      throw new Error("User already exists");
    }
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 900000),
    });
    res.json({
      message: "user added successfully!",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// login an user
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // check, if user exists in database
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // check, if password is correct or not?
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 900000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// logout an user
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

module.exports = { authRouter };
