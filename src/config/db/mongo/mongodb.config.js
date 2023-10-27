const mongoose = require("mongoose");
require('dotenv').config();


const mongoDBConnection = async () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.48j6yzw.mongodb.net/?retryWrites=true&w=majority`;
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MONGO Connected!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = mongoDBConnection;
