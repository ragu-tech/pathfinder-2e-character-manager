/**
 * Created by Navit
 */

"use strict";

var Models = require("../models");

var updateProgram = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    dataToSet.updatedAt = (new Date()).toISOString();
    Models.Program.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert in DB
var createProgram = function (objToSave, callback) {
    new Models.Program(objToSave).save(callback);
};
//Delete in DB
var deleteProgram = function (criteria, callback) {
    Models.Program.findOneAndRemove(criteria, callback);
};

//Get from DB
var getProgram = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.Program.find(criteria, projection, options, callback);
};

module.exports = {
    updateProgram: updateProgram,
    createProgram: createProgram,
    deleteProgram: deleteProgram,
    getProgram: getProgram
};
