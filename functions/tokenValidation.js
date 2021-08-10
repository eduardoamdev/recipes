require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

let tokenValidation = async (response, token) => {
  let validationResult = {};

  if (!token) {
    response.send({
      auth: false,
      message: `Not valid token.`,
      user: null,
    });
    return;
  }

  try {
    validationResult = jwt.verify(token, process.env.SECRET_WORD);
  } catch (error) {
    response.send({
      auth: false,
      message: `Not valid token.`,
      user: null,
    });
    return;
  }

  let user = await User.findById(validationResult.id, { password: 0 })
    .populate("recipes")
    .populate("favourites")
    .populate("following");

  if (!user) {
    response.send({
      auth: false,
      message: "User does not exist.",
      user: null,
    });
    return;
  }

  return user;
};

module.exports = tokenValidation;
