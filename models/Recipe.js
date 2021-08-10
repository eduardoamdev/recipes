const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: String,
    country: String,
    ingredients: Array,
    preparation: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: "created at",
      updatedAt: "updated at",
    },
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
