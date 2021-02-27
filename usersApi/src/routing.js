'use strict';
var router = require("express").Router();

module.exports = function(app) {
    app.use("/users/api/v1", router);
    return router;  
};