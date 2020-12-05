const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4,
    maxlength: 255,
  },
  birthDay: {
    type: Date,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(255).required().email(),
    birthDay: Joi.date().required(),
    img: Joi.binary(),
  });

  const validation = schema.validate(user);

  return validation;
}

exports.User = User;
exports.validateUser = validateUser;