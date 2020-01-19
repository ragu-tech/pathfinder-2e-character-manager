/**
 * Created by Navit
 */

"use strict";

var Models = require("../models");

var updateModule = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    dataToSet.updatedAt = (new Date()).toISOString();
    Models.Modules.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert in DB
var createModule = function (objToSave, callback) {
    new Models.Modules(objToSave).save(callback);
};
//Delete in DB
var deleteModule = function (criteria, callback) {
    Models.Modules.findOneAndRemove(criteria, callback);
};

//Get from DB
var getModule = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.Modules.find(criteria, projection, options, callback);
};

module.exports = {
    updateModule: updateModule,
    createModule: createModule,
    deleteModule: deleteModule,
    getModule: getModule
};
