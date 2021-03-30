const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MONGO_DATABASE } = process.env;

let usersCollection;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(MONGO_DATABASE, function (err, client) {
  usersCollection = client.db('rocket').collection('users');
});

const signUp = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return console.log('username and password must not be empty');
  }
  usersCollection.findOne({ username }).then((user) => {
    if (user) {
      return res.status(409).send({ message: 'Username already exists' });
    }
    bcrypt.hash(password, 10).then((hash) => {
      usersCollection
        .insertOne({
          username,
          password: hash
        })
        .then((user) => {
          if (!user) {
            res.status(409).send({ message: 'Failed to create user' });
          }
          const token = jwt.sign({ _id: user._id }, 'dev_key', {
            expiresIn: '1d'
          });
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 1,
            httpOnly: true
          });
          res.send({ token });
        })
        .catch((err) => {
          res.status(409).send({ message: 'Failed to create user' });
        });
    });
  });
};

const signIn = (req, res, next) => {
  const { username, password } = req.body;
  usersCollection
    .findOne({ username })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            res
              .status(404)
              .send({ message: 'Username and/or password does not match' });
          }
          const token = jwt.sign({ _id: user._id }, 'dev_key', {
            expiresIn: '1d'
          });

          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 1,
            httpOnly: true
          });

          res.send({ token });
        });
      }
    })
    .catch((err) => {
      res.status(404).send({ message: 'Failed to sign in' });
    });
};

module.exports = { signUp, signIn };
