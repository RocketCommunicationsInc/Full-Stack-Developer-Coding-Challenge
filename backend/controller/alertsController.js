const Alert = require('../model/alert');
const { MONGO_DATABASE } = process.env;

let alertsCollection;
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(MONGO_DATABASE, function (err, client) {
  alertsCollection = client.db('rocket').collection('alerts');
});

const getAlerts = (req, res, next) => {
  alertsCollection
    .find()
    .toArray()
    .then((alerts) => {
      res.send(alerts);
    })
    .catch((err) => {
      res.status(404).send({ message: 'Failed to find alerts data' });
    });
};

module.exports = { getAlerts };
