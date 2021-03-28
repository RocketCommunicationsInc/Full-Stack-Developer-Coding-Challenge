const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

const signUp = (req, res, next) => {
  console.log('req.body', req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('username and password must not be empty');
  }

  User.checkIfAvailable(username, password).then((userExists) => {
    if (userExists === true) {
      Promise.reject('Error username already exists');
    }

    bcrypt.hash(password, 10).then((hash) => {
      User.create({
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
  });
};

const signIn = (req, res, next) => {
  const { username, password } = req.body;
  User.findByUsername(username, password).then((user) => {
    const token = jwt.sign({ _id: user._id }, 'dev_key', { expiresIn: '1d' });

    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 1,
      httpOnly: true
    });

    res.send({ token });
  });
};

module.exports = { signUp, signIn };
