const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let usersCollection;
var MongoClient = require('mongodb').MongoClient;
var uri =
  'mongodb+srv://rocket:RocketComm@cluster0.od8zg.mongodb.net/test?authSource=admin&replicaSet=atlas-gaxx5g-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
MongoClient.connect(uri, function (err, client) {
  usersCollection = client.db('rocket').collection('users');
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    required: true,
    type: String,
    select: false
  }
});

userSchema.statics.findByUsername = function (username, password) {
  return this.findOne({ username })
    .select('+password')
    .then((user) => {
      if (!user) {
        console.log('no user found');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          console.log('Incorrect password');
        }
        return user;
      });
    });
};

userSchema.statics.checkIfAvailable = function (username) {
  return this.find({ username }).then((users) => {
    if (users.length === 0) {
      return false;
    }
    return true;
  });
};

module.exports = mongoose.model('user', userSchema);
