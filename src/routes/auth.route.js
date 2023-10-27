const authController = require('../controllers/auth.controller');
const path = '/auth';
module.exports = (basePath, router) =>{

    router.post(basePath + path + `/register`, authController.register);
    router.post(basePath + path + `/login`)
}