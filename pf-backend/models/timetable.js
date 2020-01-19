/**
 * Created by Navit
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../config');
const autoIncrementModelID = require('./counterModel');

var timetable = new Schema({
    id: { type: Number, unique: true, min: 1 },
    moduleId: { type: Schema.ObjectId, ref: 'modules', required: true },
    title: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, required: true, default: true },
    updatedAt: { type: Date }
});

timetable.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }
    autoIncrementModelID('timetable', this, next);
});

module.exports = mongoose.model('timetable', timetable);