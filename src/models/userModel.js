const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('isemail');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [isEmail.validate, 'please enter a valid email address'],
  },
  password: {
    type: String,
    minlength: [8, 'please enter a valid password'],
  },
});

userSchema.pre('save', function encryptPassword(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.hash(this.password, 10, (error, hash) => {
      if (error) {
        next(error);
      } else {
        this.password = hash;
        return next();
      }
    });
  }
});

userSchema.methods.sanitise = function sanitise() {
  const { password, ...rest } = this.toObject();
  return rest;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
