const Contact = require('../model/contact');

const getContacts = (req, res, next) => {
  Contact.find({})
    .then((contacts) => {
      if (!contacts) {
        return new Promise.reject();
      }
      res.send(contacts);
    })
    .catch((err) => console.log(err));
};

module.exports = { getContacts };
