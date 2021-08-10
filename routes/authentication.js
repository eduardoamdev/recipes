require("dotenv").config();

const express = require("express");
const authRoutes = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const salt = bcrypt.genSaltSync(10);

const expirationTime = 3600;

const passwordLength = 8;

authRoutes.post("/signup", async (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;

  if (!user || !pass) {
    res.send({
      auth: false,
      token: null,
      message: "Provide username and password.",
    });
    return;
  }

  if (pass.length < passwordLength) {
    res.send({
      auth: false,
      token: null,
      message: "Your password needs, at least, eight chearcters.",
    });
    return;
  }

  let foundUser = await User.findOne({ username: user }).then(
    (repeatedUser) => {
      return repeatedUser;
    }
  );

  if (foundUser != null) {
    res.send({
      auth: false,
      token: null,
      message: "User name is already taken.",
    });
    return;
  }

  const hashPass = bcrypt.hashSync(pass, salt);

  let newUser = await User.create({
    username: user,
    password: hashPass,
    recipes: [],
  })
    .then((createdUser) => {
      return createdUser;
    })
    .catch((error) => {
      res.send({
        auth: false,
        token: null,
        message: `We have the following error: ${error}`,
      });
      return;
    });

  const newToken = jwt.sign({ id: newUser._id }, process.env.SECRET_WORD, {
    expiresIn: expirationTime,
  });

  res.send({
    auth: true,
    token: newToken,
    message: "New user has been created succesfully.",
  });
});

authRoutes.post("/login", async (req, res) => {
  let name = req.body.username;
  let pass = req.body.password;
  if (!name || !pass) {
    res.send({
      auth: false,
      token: null,
      message: "Provide username and password.",
    });
    return;
  }

  let user = await User.findOne({ username: name }).then((foundUser) => {
    return foundUser;
  });

  if (!user) {
    res.send({
      auth: false,
      token: null,
      message: `User does not exist.`,
    });
    return;
  }

  let passwordIsValid = await bcrypt.compare(pass, user.password);

  if (passwordIsValid == false) {
    res.send({
      auth: false,
      token: null,
      message: `Incorrect password.`,
    });
    return;
  }

  const newToken = jwt.sign({ id: user._id }, process.env.SECRET_WORD, {
    expiresIn: expirationTime,
  });

  res.send({
    auth: true,
    token: newToken,
    message: `You have been logged in.`,
  });
});

module.exports = authRoutes;
