const path = '/user'
module.exports = (basePath, router) => {
    router.get(basePath + path + `/profile`);
}