var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model('Group', GroupSchema);
