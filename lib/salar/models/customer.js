var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var connection = require('./db').db;

var CustomerSchema = new mongoose.Schema({
  name: {type:String, unique: true},
});
CustomerSchema.plugin(uniqueValidator);

module.exports = connection.model('Customer', CustomerSchema);