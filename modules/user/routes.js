const controller = require('./controller');
// external modules should call the mount function and pass it an instance 
// of the router to add the module's routes to it
const mount = function (router) {
    // Define module routes here
    return router;
}

module.exports = {
    mount,
}
