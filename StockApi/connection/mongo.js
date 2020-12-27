"use strict";
var MongoClient = require('mongodb').MongoClient;
var connection = require('./connection.json').development;
var assert = require('assert');
function getdbUrl(){
    var url = '';
    if (connection.user.length == 0 || connection.user == ' ') {
        url =  'mongodb://' + connection.url + ':' + connection.port + '/' + connection.db;
    } else {
        url = 'mongodb://' + connection.user + ':' + connection.password + '@' + connection.url + ':' + connection.port + '/' + connection.db;
    }
    return url;
}
function getdbPort(){
    return connection.port;
}
var runDB = function (callback) {
    MongoClient.connect(getdbUrl(), { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        var db = client.db(connection.db);
        // module.exports.licence = db.collection('licence');
        module.exports.stockDetails = db.collection('stockDetails');
    
        callback (err, getdbPort());
    });
};

module.exports = {
    runDB: runDB
};
