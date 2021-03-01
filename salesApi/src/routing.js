'use strict';
var router = require("express").Router();

module.exports = function(app) {
    app.use("/sales/api/v1", router);
    return router;  
};