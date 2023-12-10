const { info, error } = require('../utils/logger.js');

const requestLogger = (req, res, next) => {
    info(`METHOD: ${req.method}`);
    info(`ENDPOINT: ${req.path}`);
    info(`TIME: ${new Date()}`);
    next();
};

module.exports = requestLogger;