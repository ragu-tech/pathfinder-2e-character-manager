/**
 * Created by Navit
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../config');
const autoIncrementModelID = require('./counterModel');

var goals = new Schema({
    id: { type: Number, unique: true, min: 1 },
    moduleId: { type: Schema.ObjectId, ref: 'modules', required: true },
    text: { type: String, required: true },
    color: { type: String },
    image: {type: String},
    createdAt: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, required: true, default: true },
    updatedAt: { type: Date }
});

goals.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }
    autoIncrementModelID('goals', this, next);
});

module.exports = mongoose.model('goals', goals);