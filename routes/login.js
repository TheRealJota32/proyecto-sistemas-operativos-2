const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = req.body.user;
  if (user !== 'admin') {
    return res.status(400).send('Invalid user');
  }

  let password = req.body.password;

  if (password !== 'admin') {
    return res.status(400).send('Invalid password');
  }

  const token = jwt.sign({user: req.body.user}, config.get('jwtPrivateKey'));

  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    user: Joi.string().min(5).max(5).required(),
    password: Joi.string().min(5).max(5).required(),
  });

  const validation = schema.validate(req.body);
  
  return validation;
}

module.exports = router;
