const path = "/room";
const roomController = require("../controllers/room.controller.js");
module.exports = (basePath, router) => {
  router.get(basePath + path + "/:id");
  router.post(basePath + path, roomController.createRoom);
};
