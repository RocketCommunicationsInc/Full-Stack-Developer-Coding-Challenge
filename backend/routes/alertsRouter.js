const alertsRouter = require('express').Router();

const { getAlerts } = require('../controller/alertsController');

alertsRouter.get('/alerts', getAlerts);

module.exports = { alertsRouter };
