/**
 * Created by Navit
 */

 /**
 * Please use mongoLogger for logging in this file try to abstain from console
 * levels of logging:
 * - TRACE - ‘blue’
 * - DEBUG - ‘cyan’
 * - INFO - ‘green’
 * - WARN - ‘yellow’
 * - ERROR - ‘red’
 * - FATAL - ‘magenta’
 */

'use strict';
var Mongoose = require('mongoose');
var CONFIG = require('./config');

var mongoUri;

if (process.env.NODE_ENV == "PRODUCTION" || process.env.NODE_ENV == "production") {
    mongoUri = CONFIG.DB_CONFIG.mongo.URI_PRODUCTION
}
else if (process.env.NODE_ENV == "STAGING" || process.env.NODE_ENV == "staging") {
    mongoUri = CONFIG.DB_CONFIG.mongo.URI_STAGING
}
else if (process.env.NODE_ENV == "TEST" || process.env.NODE_ENV == "test") {
    mongoUri = CONFIG.DB_CONFIG.mongo.URI_TEST
}
else {
    mongoUri = CONFIG.DB_CONFIG.mongo.URI_DEV
}

//Connect to MongoDB
Mongoose.connect(mongoUri, { useNewUrlParser: true }, function (err) {
    if (err) {
        mongoLogger.debug("DB Error: ", err);
        process.exit(1);
    } else {
        mongoLogger.info('MongoDB Connected');
    }
});

exports.Mongoose = Mongoose;


