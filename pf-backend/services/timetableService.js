/**
 * Created by Navit
 */

"use strict";

var Models = require("../models");

var updateTimeTable = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    dataToSet.updatedAt = (new Date()).toISOString();
    Models.Timetable.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert in DB
var createTimeTable = function (objToSave, callback) {
    new Models.Timetable(objToSave).save(callback);
};
//Delete in DB
var deleteTimeTable = function (criteria, callback) {
    Models.Timetable.findOneAndRemove(criteria, callback);
};

//Get from DB
var getTimeTable = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.Timetable.find(criteria, projection, options, callback);
};

module.exports = {
    updateTimeTable: updateTimeTable,
    createTimeTable: createTimeTable,
    deleteTimeTable: deleteTimeTable,
    getTimeTable: getTimeTable
};
