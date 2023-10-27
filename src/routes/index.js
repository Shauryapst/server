
const fs = require("fs");
const path = require('path');
const basename = path.basename(module.filename);

module.exports = (basePath, router) => {
  console.log(`Registering all the routes for all files in routes folder`);

  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      require(path.join(__dirname, file))(basePath, router);
    });
};
