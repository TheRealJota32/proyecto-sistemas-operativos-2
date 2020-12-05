const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const db = config.get('db');
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongo....'))
    .catch((err) => console.log('Could not connect to Mongo...', err));
  mongoose.set('useCreateIndex', true);
};