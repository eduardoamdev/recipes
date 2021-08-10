const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    favourites: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
