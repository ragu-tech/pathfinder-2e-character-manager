/**
 * Created by Navit
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../config');
const autoIncrementModelID = require('./counterModel');

var program = new Schema({
  id: { type: Number, unique: true, min: 1 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  programImage: {
    original: { type: String },
    thumbnail: { type: String }
  },
  createdAt: { type: Date, required: true, default: Date.now },
  isActive: { type: Boolean, required: true, default: true },
  updatedAt: { type: Date },
  modules: [{ type: Schema.ObjectId, ref: 'modules' }]
});

program.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('programs', this, next);
});

module.exports = mongoose.model('program', program);