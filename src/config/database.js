const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://sinhaaman2919:fudBNB8WR9BGXGxn@cluster0.vdjxdaa.mongodb.net/devTinder");
};

module.exports = { connectDB };
