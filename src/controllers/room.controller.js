const Room = require("../models/room.model");

const createRoom = async (req, res, next) => {
  const roomname = req.body.roomname;
  const userId = req.body.userId;
  const visibility = req.body.visibility;

  try {
    const createdRoom = await Room.create({
      createdBy: userId,
      visibility: visibility,
      roomname: roomname,
    });
    return res.status(201).json({
      id: createdRoom._id,
      roomname,
      visibility,
      createdBy: createdRoom.createdBy,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const roomDetails = async (req, res, next) => {};

module.exports = { createRoom, roomDetails };
