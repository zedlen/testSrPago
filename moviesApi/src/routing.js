'use strict';
var router = require("express").Router();

module.exports = function(app) {
    app.use("/movies/api/v1", router);
    return router;  
};