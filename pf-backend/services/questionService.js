/**
 * Created by Navit
 */

"use strict";

var Models = require("../models");

var updateQuestion = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    dataToSet.updatedAt = (new Date()).toISOString();
    Models.Question.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert in DB
var createQuestion = function (objToSave, callback) {
    new Models.Question(objToSave).save(callback);
};
//Delete in DB
var deleteQuestion = function (criteria, callback) {
    Models.Question.findOneAndRemove(criteria, callback);
};

//Get from DB
var getQuestion = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.Question.find(criteria, projection, options, callback);
};

module.exports = {
    updateQuestion: updateQuestion,
    createQuestion: createQuestion,
    deleteQuestion: deleteQuestion,
    getQuestion: getQuestion
};
