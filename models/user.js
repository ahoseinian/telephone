// var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  pages: [{
    name: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      default: 1,
    },
  }],
  admin: Number,
});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function (password) {
  // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  return password;
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  // return bcrypt.compareSync(password, this.password);
  return password == this.password;
};

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
