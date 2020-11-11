"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  created: {
    type: Date,
    "default": Date.now
  }
});
UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, function (err, encrypted) {
    user.password = encrypted;
    return next();
  });
});
module.exports = mongoose.model('User', UserSchema);