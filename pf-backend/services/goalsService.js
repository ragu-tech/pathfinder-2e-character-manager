/**
 * Created by Navit
 */

"use strict";

var Models = require("../models");

var updateGoals = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    dataToSet.updatedAt = (new Date()).toISOString();
    Models.Goals.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert in DB
var createGoals = function (objToSave, callback) {
    new Models.Goals(objToSave).save(callback);
};
//Delete in DB
var deleteGoals = function (criteria, callback) {
    Models.Goals.findOneAndRemove(criteria, callback);
};

//Get from DB
var getGoals = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.Goals.find(criteria, projection, options, callback);
};

module.exports = {
    updateGoals: updateGoals,
    createGoals: createGoals,
    deleteGoals: deleteGoals,
    getGoals: getGoals
};
