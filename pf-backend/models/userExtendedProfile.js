/**
 * Created by Navit on 15/11/16.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Config = require("../config");

var userExtendedProfile = new Schema({
    userId: { type: Schema.ObjectId, ref: 'user' },
    program: [{
        programId: { type: Number },
        status: {
            type: String, enum: [
                Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.LOCKED,
                Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED,
                Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE,
                Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE
            ], default: Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
        completedModulesCount: { type: Number, min: 0, default: 0 },
        module: [{
            moduleId: { type: Number },
            status: {
                type: String, enum: [
                    Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.LOCKED,
                    Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED,
                    Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE,
                    Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE
                ], default: Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED
            },
            createdAt: { type: Date, default: Date.now },
            timeTable: [Number],
            activity: [{
                activityId: { type: Number },
                status: {
                    type: String, enum: [
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.LOCKED,
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED,
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE,
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE
                    ], default: Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED
                },
                createdAt: { type: Date, default: Date.now },
            }],
            goalUpdatedStatus: { type: Boolean, default: false },
            goal: [{
                goalId: { type: Number },
                status: {
                    type: String, enum: [
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.LOCKED,
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED,
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE,
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE
                    ], default: Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED
                },
                createdAt: { type: Date, default: Date.now },
            }],
            quiz: [{
                quizId: { type: Number },
                status: {
                    type: String, enum: [
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.LOCKED,
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED,
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE,
                        Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE
                    ], default: Config.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED
                },
                createdAt: { type: Date, default: Date.now },
                submission: [{
                    submissionId: { type: Number },
                    submission: [{
                        questionId: { type: Number },
                        answerId: [Number]
                    }],
                    createdAt: { type: Date, default: Date.now }
                }]
            }]
        }],
    }],
    favouriteModules: [
        {
            programId: { type: Number },
            id: { type: Number }
        }
    ],
    favouriteActivities: [
        {
            programId: { type: Number },
            moduleId: { type: Number },
            id: { type: Number }
        }
    ],
});

module.exports = mongoose.model("userExtendedProfile", userExtendedProfile);
