
"use strict";
var guid = require('guid');
var ObjectId = require('mongodb').ObjectID;
var mongo = require('../connection/mongo');
const bcrypt = require('bcrypt');

var addStock = function (stock, callback) {
    mongo.stockDetails.insert(stock, {w: 1}, function (err, result) {
        if (err) {
            var error = new Error("Added stock. " + err.message);
            error.status = err.status;
            callback (error);
            return;
        }
        callback(null, result);
    });
};
var getStock = function (callback) {
    mongo.stockDetails.find({}).toArray((err, result) => {
        if (err) {
            var error = new Error("findAll stock. " + err.message);
            error.status = err.status;
            callback (error);
            return;
        }
        callback(null, result);
    });
};

module.exports = {
    addStock: addStock,
    getStock: getStock
};
