var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/amir');

exports.db = db;