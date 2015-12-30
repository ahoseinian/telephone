// database.js
var db = require('mongoose');
db.connect('mongodb://localhost/telephone');


exports.db = db;
