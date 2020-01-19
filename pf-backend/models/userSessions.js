/**
 * Created by Navit
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../config');

var userSession = new Schema({
    userId: { type: Schema.ObjectId, ref: 'users', required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    sessionStatus: {
        type: String, required: true, enum: [
            Config.APP_CONSTANTS.DATABASE.SESSION_STATUS.ACTIVE,
            Config.APP_CONSTANTS.DATABASE.SESSION_STATUS.FINISHED
        ], default: Config.APP_CONSTANTS.DATABASE.SESSION_STATUS.ACTIVE
    },
    endedAt: { type: Date }
});

module.exports = mongoose.model('userSession', userSession);