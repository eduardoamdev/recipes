require("dotenv").config();

const mongoose = require("mongoose");

let productionDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.x6xvy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

let localDB = `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

mongoose
  .connect(productionDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("We are connected to our database.");
  })
  .catch((error) => {
    console.log(error);
  });
