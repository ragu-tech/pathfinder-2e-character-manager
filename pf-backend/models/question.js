/**
 * Created by Navit
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../config');
const autoIncrementModelID = require('./counterModel');

var questionOptions = new Schema({
    id: { type: Number , min: 1},
    option: { type: String },
    answerType: {
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE.ANSWER_TYPE.CHECKBOX,
            Config.APP_CONSTANTS.DATABASE.ANSWER_TYPE.IMAGE
        ]
    },
    feedback: { type: String }
})

var question = new Schema({
    id: { type: Number, unique: true, min: 1 },
    quizId: { type: Schema.ObjectId, ref: 'quiz', required: true },
    question: { type: String, required: true },
    questionType: {
        type: String, required: true, enum: [
            Config.APP_CONSTANTS.DATABASE.QUIZ_TYPE.SINGLE_CHOICE,
            Config.APP_CONSTANTS.DATABASE.QUIZ_TYPE.MULTIPLE_CHOICE
        ]
    },
    options: { type: [questionOptions] },
    answerId: [{ type: Number }],
    createdAt: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, required: true, default: true },
    updatedAt: { type: Date }
});

question.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }
    autoIncrementModelID('question', this, next);
});

module.exports = mongoose.model('question', question);