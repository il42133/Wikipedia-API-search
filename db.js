const mongoose = require('mongoose');

const uri = 'mongodb+srv://il42133:rtfvs9zO35ixkoCm@cluster0.v7rw9.mongodb.net/6003?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to the MongoDB cluster');
});

module.exports = mongoose;
