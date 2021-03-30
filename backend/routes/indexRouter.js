const indexRouter = require('express').Router();
const { alertsRouter } = require('./alertsRouter');
const { contactsRouter } = require('./contactsRouter');
const { signUp, signIn } = require('../controller/usersController');

indexRouter.post('/signup', signUp);
indexRouter.post('/signin', signIn);

indexRouter.use('/', alertsRouter);
indexRouter.use('/', contactsRouter);

module.exports = { indexRouter };
