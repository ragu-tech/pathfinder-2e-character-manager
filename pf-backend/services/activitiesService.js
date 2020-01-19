/**
 * Created by Navit
 */

"use strict";

var Models = require("../models");

var updateActivities = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    dataToSet.updatedAt = (new Date()).toISOString();
    Models.Activities.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert in DB
var createActivities = function (objToSave, callback) {
    new Models.Activities(objToSave).save(callback);
};
//Delete in DB
var deleteActivities = function (criteria, callback) {
    Models.Activities.findOneAndRemove(criteria, callback);
};

//Get from DB
var getActivities = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.Activities.find(criteria, projection, options, callback);
};

module.exports = {
    updateActivities: updateActivities,
    createActivities: createActivities,
    deleteActivities: deleteActivities,
    getActivities: getActivities
};
