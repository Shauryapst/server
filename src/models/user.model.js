const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique : true
    },
    email : {
      type: String,
      unique: true
    },
    firstName: {
      type: String,
      default: null
    },
    lastName: {
      default: null,
      type: String
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
