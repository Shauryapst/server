const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    password: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
