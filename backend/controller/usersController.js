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

  bcrypt.hash(password, 10).then((hash) => {
    usersCollection
      .insertOne({
        username,
        password: hash
      })
      .then((user) => {
        if (!user) {
          console.log('Failed to create user');
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
        console.log('Error creating user', err);
      });
  });
};

const signIn = (req, res, next) => {
  const { username, password } = req.body;
  usersCollection.findOne({ username }).then((user) => {
    if (user) {
      const token = jwt.sign({ _id: user._id }, 'dev_key', {
        expiresIn: '1d'
      });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 1,
        httpOnly: true
      });

      res.send({ token });
    }
  });
};

module.exports = { signUp, signIn };
