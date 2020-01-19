/**
 * Created by Navit
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../config');
const autoIncrementModelID = require('./counterModel');

var contentSchema = new Schema({
    type: {
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.HTML,
            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.IMAGE,
            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.TEXT,
            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.VIDEO,
            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.CAROUSEL
        ]
    },
    content: { type: String },
    position: { type: Number },
    misc: [{
        key: { type: Number },
        content: { type: String },
        subText: { type: String },
        redirect: { type: String }
    }]
})

var modules = new Schema({
    id: { type: Number, unique: true, min: 1 },
    programId: { type: Schema.ObjectId, ref: 'program', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    moduleImage: {
        original: { type: String },
        thumbnail: { type: String }
    },
    createdAt: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, required: true, default: true },
    updatedAt: { type: Date },
    timetable: [{ type: Schema.ObjectId, ref: 'timetable' }],
    quizes: [{ type: Schema.ObjectId, ref: 'quiz' }],
    activities: [{ type: Schema.ObjectId, ref: 'activities' }],
    goals: [{ type: Schema.ObjectId, ref: 'goals' }],
    content: { type: [contentSchema] }
});

modules.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('modules', this, next);
});

module.exports = mongoose.model('modules', modules);