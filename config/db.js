const mongoose = require('mongoose');

const uri = 'mongodb+srv://il42133:rtfvs9zO35ixkoCm@cluster0.v7rw9.mongodb.net/6003?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => console.log('Connected to the MongoDB cluster'))
  .catch((error) => console.error('Connection error:', error));

module.exports = mongoose;
