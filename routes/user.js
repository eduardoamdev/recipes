const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");
const User = require("../models/User");

const tokenValidation = require("../functions/tokenValidation");
const verifyOwner = require("../functions/verifyOwner");

const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

const passwordLength = 8;

router.get("/user", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  res.send({ user: user, auth: true, message: "You are permitted." });
});

router.get("/user/:userId", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let id = req.params.userId;

  let foundUser = await User.findById(id).populate("recipes");

  let isFollowed = false;

  if (user.following.length != 0) {
    user.following.forEach((element) => {
      if (element._id.toString() == foundUser._id.toString()) {
        isFollowed = true;
      }
    });
  }

  res.send({ user: foundUser, auth: true, followed: isFollowed });
});

router.get("/searchUser/:username", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let name = req.params.username;

  let foundUser = await User.findOne({ username: name }, { password: 0 })
    .populate("recipes")
    .populate("favourites");

  if (foundUser) {
    if (user._id.toString() == foundUser._id.toString()) {
      res.send({
        user: null,
        auth: true,
        message: "Do not search you profile.",
      });
    } else {
      res.send({ user: foundUser, auth: true });
    }
  } else {
    res.send({
      user: null,
      auth: true,
      message: "This user does not exist.",
    });
  }
});

router.get("/searchRecipe/:recipeName", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let name = req.params.recipeName;

  let recipes = await Recipe.find({ name: name });

  if (recipes.length != 0) {
    res.send({
      recipes: recipes,
      recipeName: name,
      auth: true,
      message: "Recipes are here.",
    });
  } else if (recipes.length == 0) {
    res.send({
      auth: true,
      recipes: null,
      message: "Recipe does not exist here.",
    });
  }
});

router.get("/recipes/:recipeName", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let name = req.params.recipeName;

  let foundedRecipes = await Recipe.find({ name: name });

  let userRecipes = user.recipes;
  let selectedRecipes = [];

  foundedRecipes.forEach((recipe) => {
    let isMine = false;
    for (let i = 0; i < userRecipes.length; i++) {
      if (recipe._id.toString() == userRecipes[i]._id.toString()) {
        isMine = true;
      }
    }
    if (isMine == false) {
      selectedRecipes.push(recipe);
    }
  });

  res.send({
    recipes: selectedRecipes,
    auth: true,
    message: "Process has ended.",
  });
});

router.post("/followUser/:userId", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let followedUserId = req.params.userId;

  let alreadyFollowing = false;

  user.following.forEach((populatedElement) => {
    if (populatedElement._id == followedUserId) {
      alreadyFollowing = true;
    }
  });

  if (alreadyFollowing == false) {
    await User.findByIdAndUpdate(user._id, {
      $push: { following: followedUserId },
    });
  } else if (alreadyFollowing == true) {
    await User.findByIdAndUpdate(user._id, {
      $pull: { following: followedUserId },
    });
  }

  let followedUser = await User.findById(followedUserId);

  res.send({ user: followedUser, auth: true });
});

router.post("/favouriteRecipe/:recipeId", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let favouriteId = req.params.recipeId;

  let alreadyFavourite = false;

  user.favourites.forEach((populatedElement) => {
    if (populatedElement._id == favouriteId) {
      alreadyFavourite = true;
    }
  });

  if (alreadyFavourite == false) {
    await User.findByIdAndUpdate(user._id, {
      $push: { favourites: favouriteId },
    });
  } else if (alreadyFavourite == true) {
    await User.findByIdAndUpdate(user._id, {
      $pull: { favourites: favouriteId },
    });
  }

  res.redirect(`/recipe/${favouriteId}`);
});

router.get("/recipe/:recipeId", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let id = req.params.recipeId;

  let isFavourite = false;

  user.favourites.forEach((element) => {
    if (element._id == id) {
      isFavourite = true;
    }
  });

  let recipe = await Recipe.findById(id).populate("creator");

  if (recipe) {
    res.send({ recipe: recipe, favourite: isFavourite, auth: true });
  } else {
    res.send({ recipe: null, favourite: isFavourite, auth: true });
  }
});

router.post("/newRecipe", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let recipeName = req.body.name;
  let recipeCountry = req.body.country;
  let recipeIngredients = req.body.ingredients;
  let recipePreparation = req.body.preparation;

  let recipe = await Recipe.create({
    name: recipeName,
    country: recipeCountry,
    ingredients: recipeIngredients,
    preparation: recipePreparation,
    creator: user._id,
  });

  await User.findByIdAndUpdate(user._id, {
    $push: { recipes: recipe._id },
  });

  res.redirect(`/recipe/${recipe._id}`);
});

router.post("/updateRecipe/:recipeId", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let userId = user._id;

  let recipeId = req.params.recipeId;

  let isRecipeOwner = await verifyOwner(userId, recipeId);

  if (isRecipeOwner == false) {
    res.send({
      message: "You are not allowed to update this recipe.",
    });
    return;
  }

  let recipeName = req.body.name;
  let recipeCountry = req.body.country;
  let recipeIngredients = req.body.ingredients;
  let recipePreparation = req.body.preparation;

  await Recipe.findByIdAndUpdate(recipeId, {
    name: recipeName,
    country: recipeCountry,
    ingredients: recipeIngredients,
    preparation: recipePreparation,
  });

  res.redirect(`/recipe/${recipeId}`);
});

router.delete("/deleteRecipe/:recipeId", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let userId = user._id;

  let recipeId = req.params.recipeId;

  let isRecipeOwner = await verifyOwner(userId, recipeId);

  if (isRecipeOwner == false) {
    res.send({
      message: "You are not allowed to update this recipe.",
    });
    return;
  }

  let recipe = await Recipe.findByIdAndDelete(recipeId);

  await User.findByIdAndUpdate(user._id, {
    $pull: { recipes: recipe._id },
  });

  let users = await User.find();

  users.forEach(async (eachUser) => {
    let foundFavourite = eachUser.favourites.find((favourite) => {
      return toString(favourite) == toString(recipe._id);
    });
    if (foundFavourite != undefined) {
      await User.findByIdAndUpdate(eachUser._id, {
        $pull: { favourites: recipe._id },
      });
    }
  });

  res.send(recipe);
});

router.put("/changePassword", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let currentPassword = req.body.currentPassword;
  let newPassword = req.body.newPassword;

  if (!currentPassword || !newPassword) {
    res.send({
      auth: true,
      message: "Fill the fields.",
    });
    return;
  }

  if (newPassword.length < passwordLength) {
    res.send({
      auth: true,
      message: "Choose a longer password.",
    });
    return;
  }

  let userWithPassword = await User.findById(user._id);

  let currentPasswordIsValid = await bcrypt.compare(
    currentPassword,
    userWithPassword.password
  );

  if (currentPasswordIsValid == false) {
    res.send({
      auth: true,
      message: `Incorrect password.`,
    });
    return;
  }

  const hashPass = bcrypt.hashSync(newPassword, salt);

  await User.findByIdAndUpdate(user._id, {
    username: user.username,
    password: hashPass,
    recipes: user.recipes,
    favourites: user.favourites,
    following: user.following,
  });

  res.send({ auth: true, message: "Password succesfully changed." });
});

router.delete("/deleteUser", async (req, res) => {
  let myToken = req.headers.token;

  let user = await tokenValidation(res, myToken);

  if (!user) {
    return;
  }

  let userId = user._id;

  let deletedUser = await User.findByIdAndDelete(userId);

  let users = await User.find();

  users.forEach((eachUser) => {
    let followingArr = eachUser.following;
    followingArr.forEach((followedUserId) => {
      if (userId.toString() == followedUserId.toString()) {
        User.findByIdAndUpdate(eachUser._id, {
          $pull: { following: userId },
        });
      } else {
      }
    });
  });

  deletedUser.recipes.forEach(async (recipeId) => {
    let recipe = await Recipe.findByIdAndDelete(recipeId);

    users.forEach(async (eachUser) => {
      let foundFavourite = eachUser.favourites.find((favourite) => {
        return toString(favourite) == toString(recipe._id);
      });
      if (foundFavourite != undefined) {
        await User.findByIdAndUpdate(eachUser._id, {
          $pull: { favourites: recipe._id },
        });
      }
    });
  });

  res.send({
    auth: false,
    token: null,
    message: "User has been deleted successfully.",
  });
});

module.exports = router;
