const User = require("../models/User");

let verifyRecipeOwner = async (userId, recipeId) => {
  let users = await User.find().then((allUsers) => {
    return allUsers;
  });

  let owner = {};

  users.forEach((user) => {
    if (user.recipes.includes(recipeId)) {
      owner = user;
    }
  });

  let isOwner = false;
  
  if (userId.toString() == owner._id.toString()) {
    isOwner = true;
  }

  return isOwner;
};

module.exports = verifyRecipeOwner;
