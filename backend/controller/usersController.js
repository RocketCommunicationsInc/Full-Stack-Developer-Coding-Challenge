const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  console.log('req.body', req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('username and password must not be empty');
  }

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      username,
      password: hash
    })
      .then((user) => {
        if (!user) {
          console.log('failed to create user');
        }
        res.send(user);
      })
      .catch((err) => {
        console.lo(err);
      });
  });
};

const login = (req, res, next) => {
  const { username, password } = req.body;
  User.findByUsername(username, password).then((user) => {
    const token = jwt.sign(
      { _id: username._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev_key',
      { expiresIn: '1d' }
    );

    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 1,
      httpOnly: true
    });

    res.send(token)
  });
};

module.exports = { createUser, login };
