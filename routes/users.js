const auth = require('../middleware/auth');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();

//all users
router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});

//user by id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

//add user
router.post('/', auth, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('User already registered');
  }

  user = new User(_.pick(req.body, ['name', 'email', 'birthDay', 'img']));

  await user.save();

  res.send(_.pick(user, ['_id', 'name', 'email', 'birthDay']));
});

//edit user
router.put('/:id', auth, async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.updateOne(
    {_id:req.params.id}, 
    {name: req.body.name,
    email: req.body.email,
    birthDay: req.body.birthDay,
    img: req.body.img},
    {new: true}
  );

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send('User updated');
});

//delete user
router.delete('/:id', auth, async (req,res) =>{
  const user = await User.deleteOne({_id:req.params.id});

  if(!user){
    return res.status(404).send('User not found');
  }

  res.send('User deleted');
});

module.exports = router;
