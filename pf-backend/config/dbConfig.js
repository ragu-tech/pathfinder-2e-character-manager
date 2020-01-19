/**
 * Created by Navit
 */

 'use strict';

var mongo = {
    URI_DEV: process.env.MONGO_URI || 'mongodb://localhost/ipan-v2-backend',
    URI_TEST: process.env.MONGO_URI || "mongodb://"+process.env.MONGO_USER_IPANV2+":"+process.env.MONGO_PASS_IPANV2+"@localhost/"+process.env.MONGO_DBNAME_IPANV2_TEST,
    URI_STAGING: process.env.MONGO_URI || "mongodb://"+process.env.MONGO_USER_IPANV2_STAGING+":"+process.env.MONGO_PASS_IPANV2_STAGING+"@localhost/"+process.env.MONGO_DBNAME_IPANV2_STAGING,
    URI_PRODUCTION: process.env.MONGO_URI || "mongodb://"+process.env.MONGO_USER_IPANV2_PRODUCTION+":"+process.env.MONGO_PASS_IPANV2_PRODUCTION+"@localhost/"+process.env.MONGO_DBNAME_IPANV2_PRODUCTION,
    port: 27017
};

module.exports = {
    mongo: mongo
};



