var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ContactSchema = new mongoose.Schema({
  name: { type: String },
  phones: [{
    num: String,
    mode: String,
  }],
  company: String,
  address: String,
  email: String,
  info: String,
  tavalod: String,
  website: String,
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
});
ContactSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Contact', ContactSchema);
