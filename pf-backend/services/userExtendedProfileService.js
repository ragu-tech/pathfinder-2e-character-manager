/**
 * Created by Navit on 15/11/16.
 */
"use strict";

var Models = require("../models");

var updateUserExtendedProfile = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    dataToSet.updatedAt = (new Date()).toISOString();
    Models.UserExtendedProfile.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert in DB
var createUserExtendedProfile = function (objToSave, callback) {
    new Models.UserExtendedProfile(objToSave).save(callback);
};
//Delete in DB
var deleteUserExtendedProfile = function (criteria, callback) {
    Models.UserExtendedProfile.findOneAndRemove(criteria, callback);
};

//Get from DB
var getUserExtendedProfile = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.UserExtendedProfile.find(criteria, projection, options, callback);
};

module.exports = {
    updateUserExtendedProfile: updateUserExtendedProfile,
    createUserExtendedProfile: createUserExtendedProfile,
    deleteUserExtendedProfile: deleteUserExtendedProfile,
    getUserExtendedProfile: getUserExtendedProfile
};
