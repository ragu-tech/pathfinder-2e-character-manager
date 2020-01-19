/**
 * Created by Navit
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../config');
const autoIncrementModelID = require('./counterModel');

var userTracking = new Schema({
    id: { type: Number, unique: true, min: 1 },
    userId: { type: Schema.ObjectId, ref: 'users', required: true },
    sessionId: { type: Schema.ObjectId, ref: 'userSessions', required: true },
    programId: { type: Number, required: true },
    moduleId: { type: Number, required: true },
    trackingType: {
        type: String, required: true, enum: [
            Config.APP_CONSTANTS.DATABASE.TRACKERS.T_IMAGE_CLICK,
            Config.APP_CONSTANTS.DATABASE.TRACKERS.T_LOGIN,
            Config.APP_CONSTANTS.DATABASE.TRACKERS.T_LOGOUT,
            Config.APP_CONSTANTS.DATABASE.TRACKERS.T_VIDEO_CLICK,
            Config.APP_CONSTANTS.DATABASE.TRACKERS.T_VISIT_URL
        ]
    },
    linkToTrack: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    misc: [{
        key: { type: String },
        value: { type: String }
    }]
});

userTracking.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }
    autoIncrementModelID('userTracking', this, next);
});

module.exports = mongoose.model('userTracking', userTracking);