/**
 * Created by Navit on 15/11/16.
 */
"use strict";

var Models = require("../models");

var updateUserSession = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    dataToSet.updatedAt = (new Date()).toISOString();
    Models.UserSessions.findOneAndUpdate(criteria, dataToSet, options, callback);
};

var updateMultiUserSessions = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    Models.UserSessions.update(criteria, dataToSet, options, callback);
};
//Insert User in DB
var createUserSession = function (objToSave, callback) {
    new Models.UserSessions(objToSave).save(callback);
};
//Delete User in DB
var deleteUserSession = function (criteria, callback) {
    Models.UserSessions.findOneAndRemove(criteria, callback);
};

//Get Users from DB
var getUserSession = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.UserSessions.find(criteria, projection, options, callback);
};

module.exports = {
    updateUserSession: updateUserSession,
    createUserSession: createUserSession,
    deleteUserSession: deleteUserSession,
    getUserSession: getUserSession,
    updateMultiUserSessions: updateMultiUserSessions
};
