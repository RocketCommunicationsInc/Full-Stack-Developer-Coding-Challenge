const Alert = require('../model/alert');

const getAlerts = (req, res, next) => {
  Alert.find({})
    .then((alerts) => {
      if (!alerts) {
        return new Promise.reject();
      }
      res.send(alerts);
    })
    .catch((err) => console.log(err));
};

module.exports = { getAlerts };
