const contactsRouter = require('express').Router();

const { getContacts } = require('../controller/contactsController');

contactsRouter.get('/contacts', getContacts);

module.exports = { contactsRouter };
