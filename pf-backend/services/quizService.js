/**
 * Created by Navit
 */

"use strict";

var Models = require("../models");

var updateQuiz = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    dataToSet.updatedAt = (new Date()).toISOString();
    Models.Quiz.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert in DB
var createQuiz = function (objToSave, callback) {
    new Models.Quiz(objToSave).save(callback);
};
//Delete in DB
var deleteQuiz = function (criteria, callback) {
    Models.Quiz.findOneAndRemove(criteria, callback);
};

//Get from DB
var getQuiz = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.Quiz.find(criteria, projection, options, callback);
};

module.exports = {
    updateQuiz: updateQuiz,
    createQuiz: createQuiz,
    deleteQuiz: deleteQuiz,
    getQuiz: getQuiz
};
