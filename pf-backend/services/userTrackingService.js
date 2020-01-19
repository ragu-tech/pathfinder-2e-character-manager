/**
 * Created by Navit on 15/11/16.
 */
"use strict";

var Models = require("../models");

var updateUserTracking = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    dataToSet.updatedAt = (new Date()).toISOString();
    Models.UserTracking.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert User in DB
var createUserTracking = function (objToSave, callback) {
    new Models.UserTracking(objToSave).save(callback);
};
//Delete User in DB
var deleteUserTracking = function (criteria, callback) {
    Models.UserTracking.findOneAndRemove(criteria, callback);
};

//Get Users from DB
var getUserTracking = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.UserTracking.find(criteria, projection, options, callback);
};

module.exports = {
    updateUserTracking: updateUserTracking,
    createUserTracking: createUserTracking,
    deleteUserTracking: deleteUserTracking,
    getUserTracking: getUserTracking
};
