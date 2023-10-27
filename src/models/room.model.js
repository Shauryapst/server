const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    roomname: {
      type: String,
    },
    visibility: {
      type: String,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PUBLIC",
    },
  },
  {
    timeStamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
