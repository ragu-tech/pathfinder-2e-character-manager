/**
 * Created by Navit
 */

/**
 * Please use appLogger for logging in this file try to abstain from console
 * levels of logging:
 * - TRACE - ‘blue’
 * - DEBUG - ‘cyan’
 * - INFO - ‘green’
 * - WARN - ‘yellow’
 * - ERROR - ‘red’
 * - FATAL - ‘magenta’
 */

var Service = require("../../services");
var UniversalFunctions = require("../../utils/universalFunctions");
var async = require("async");
var CONFIG = UniversalFunctions.CONFIG;
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var _ = require("underscore");

var getPrograms = function (userData, callback) {
    var userFound, userProgramData, availableProgramData, userPrograms, userProgramIds;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {
                "program.programId": 1,
                "program.status": 1
            }
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.map(userPrograms, "programId");
                    if (userProgramIds.length == 0) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                id: { $in: userProgramIds },
                isActive: true
            }
            Service.ProgramService.getProgram(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userProgramData = data
                    userProgramData.forEach(function (program) {
                        program.status = (_.findWhere(userPrograms, { programId: program.id })).status
                    })
                    cb()
                }
            })
        },
        function (cb) {
            Service.ProgramService.getProgram({ id: { $nin: userProgramIds }, isActive: true }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    availableProgramData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { userProgramData: userProgramData, availableProgramData: availableProgramData })
    })
}

var getModules = function (userData, payloadData, callback) {
    var programData, availableModuleData, userFound, userPrograms, userProgramIds, userProgramModules, userModuleIds, userEnrolledModules;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        if (!data[0].isActive) cb(ERROR.PROGRAM_BLOCKED)
                        else {
                            programData = data && data[0] || null;
                            cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userPrograms = data[0].program;
                        userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                        if (!userProgramIds) cb(ERROR.PROGRAM_NOT_ENROLL)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            userProgramModules = userProgramIds.module;
            userModuleIds = _.map(userProgramModules, "moduleId");
            Service.ModuleService.getModule({ id: { $in: userModuleIds }, isActive: true }, {
                id: 1,
                programId: 1,
                title: 1,
                description: 1,
                moduleImage: 1,
                createdAt: 1,
                isActive: 1,
            }, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userEnrolledModules = data;
                    userEnrolledModules.forEach(function (userModule) {
                        userModule.status = (_.findWhere(userProgramModules, { moduleId: parseInt(userModule.id) })).status
                    })
                    cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: { $nin: userModuleIds }, programId: programData._id, isActive: true }, {
                id: 1,
                programId: 1,
                title: 1,
                description: 1,
                moduleImage: 1,
                createdAt: 1,
                isActive: 1,
            }, {}, function (err, data) {
                if (err) cb(err)
                else {
                    availableModuleData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { userEnrolledModules: userEnrolledModules, availableModuleData: availableModuleData })
    })
}

var getSpecificModule = function (userData, payloadData, callback) {
    var programData, moduleData, userFound, userPrograms, userProgramModules, userProgramIds;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        if (!data[0].isActive) cb(ERROR.PROGRAM_BLOCKED)
                        else {
                            programData = data && data[0] || null;
                            cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, isActive: true }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    moduleData = data && data[0] || null;
                    moduleData.status = userProgramModules.status
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { moduleData: moduleData })
    })
}

var getModuleTimeTable = function (userData, payloadData, callback) {
    var programData, adminTimeTable, userFound, userPrograms, userProgramModules, userProgramIds, userTimetableId, userTimeTable;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        if (!data[0].isActive) cb(ERROR.PROGRAM_BLOCKED)
                        else {
                            programData = data && data[0] || null;
                            cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            userTimetableId = userProgramModules.timeTable;
            Service.TimeTableService.getTimeTable({ id: { $in: userTimetableId }, moduleId: moduleData._id, isActive: true }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userTimeTable = data;
                    cb()
                }
            })
        },
        function (cb) {
            Service.TimeTableService.getTimeTable({ id: { $nin: userTimetableId }, moduleId: moduleData._id, isActive: true }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    adminTimeTable = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { userTimeTable: userTimeTable, adminTimeTable: adminTimeTable })
    })
}

var getModuleActivities = function (userData, payloadData, callback) {
    var programData, activityData, userFound, userPrograms, userProgramModules, userProgramIds, userActivityId, completedActivities, availableActivities;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        if (!data[0].isActive) cb(ERROR.PROGRAM_BLOCKED)
                        else {
                            programData = data && data[0] || null;
                            cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            userActivityId = _.map(userProgramModules.activity, "activityId");
            Service.ActivitiesService.getActivities({ id: { $in: userActivityId }, moduleId: moduleData._id, isActive: true }, { title: 1, description: 1, id: 1 }, {}, function (err, data) {
                if (err) cb(err)
                else {
                    completedActivities = data;
                    cb()
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.getActivities({ id: { $nin: userActivityId }, moduleId: moduleData._id, isActive: true }, { title: 1, description: 1, id: 1 }, {}, function (err, data) {
                if (err) cb(err)
                else {
                    availableActivities = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { completedActivities: completedActivities, availableActivities: availableActivities })
    })
}

var getModuleActivityContent = function (userData, payloadData, callback) {
    var programData, activityData, userFound, userPrograms, userProgramModules, userProgramIds;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        if (!data[0].isActive) cb(ERROR.PROGRAM_BLOCKED)
                        else {
                            programData = data && data[0] || null;
                            cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.getActivities({ id: payloadData.activityId, moduleId: moduleData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_ACTIVITY_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.getActivities({ id: payloadData.activityId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.ACTIVITY_NOT_FOUND)
                    else if (data[0].isActive == false) cb(ERROR.ACTIVITY_NOT_FOUND)
                    else {
                        activityData = data && data[0] || null;
                        cb()
                    }
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { activityData: activityData })
    })
}

var getModuleGoals = function (userData, payloadData, callback) {
    var programData, userGoalData, adminGoalsData, userFound, userPrograms, userProgramModules, userProgramIds, userGoals, userGoalIds;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        if (!data[0].isActive) cb(ERROR.PROGRAM_BLOCKED)
                        else {
                            programData = data && data[0] || null;
                            cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            userGoals = userProgramModules.goal;
            userGoalIds = _.map(userGoals, "goalId");
            Service.GoalsService.getGoals({ id: { $in: userGoalIds }, moduleId: moduleData._id, isActive: true }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userGoalData = data;
                    cb()
                }
            })
        },
        function (cb) {
            Service.GoalsService.getGoals({ id: { $nin: userGoalIds }, moduleId: moduleData._id, isActive: true }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    adminGoalsData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { userGoalData: userGoalData, adminGoalsData: adminGoalsData })
    })
}

var getModuleQuiz = function (userData, payloadData, callback) {
    var programData, availableQuiz, completedQuiz, userFound, userPrograms, userProgramModules, userProgramIds, userModuleQuiz;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        if (!data[0].isActive) cb(ERROR.PROGRAM_BLOCKED)
                        else {
                            programData = data && data[0] || null;
                            cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else {
                            userModuleQuiz = _.map(userProgramModules.quiz, "quizId");
                            cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            Service.QuizService.getQuiz({ id: { $in: userModuleQuiz }, moduleId: moduleData._id, isActive: true }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    completedQuiz = data;
                    cb()
                }
            })
        },
        function (cb) {
            Service.QuizService.getQuiz({ id: { $nin: userModuleQuiz }, moduleId: moduleData._id, isActive: true }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    availableQuiz = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { completedQuiz: completedQuiz, availableQuiz: availableQuiz })
    })
}

var getModuleQuizQuestion = function (userData, payloadData, callback) {
    var programData, quizData, questionData, userFound, userPrograms, userProgramModules, userProgramIds;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        if (!data[0].isActive) cb(ERROR.PROGRAM_BLOCKED)
                        else {
                            programData = data && data[0] || null;
                            cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            Service.QuizService.getQuiz({ id: payloadData.quizId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.QUIZ_NOT_FOUND)
                    else if (!data[0].isActive) cb(ERROR.QUIZ_BLOCKED)
                    else {
                        quizData = data && data[0] || null;;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.QuizService.getQuiz({ _id: quizData._id, moduleId: moduleData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_QUIZ_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.QuestionService.getQuestion({ quizId: quizData._id, isActive: true }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    questionData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { questionData: questionData })
    })
}

var enrolToProgram = function (userData, payloadData, callback) {
    var userExtendedData, userFound;
    var firstProgram = false;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            var criteria = {
                id: payloadData.programId,
                isActive: true
            }
            Service.ProgramService.getProgram(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) {
                        var dataToSave = {
                            userId: userData._id
                        }
                        Service.UserExtendedProfileService.createUserExtendedProfile(dataToSave, function (err, data) {
                            if (err) cb(err)
                            else {
                                userExtendedData = data;
                                firstProgram = true;
                                cb()
                            }
                        })
                    }
                    else {
                        userExtendedData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            if (firstProgram) {
                var criteria = {
                    _id: userExtendedData._id
                }
                var dataToUpdate = {
                    $addToSet: {
                        program: {
                            programId: payloadData.programId,
                            status: CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE
                        }
                    }
                }
                Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, {}, function (err, data) {
                    if (err) cb(err)
                    else cb()
                })
            }
            else {
                checkAndAddProgram(userData, payloadData, userExtendedData, function (err, data) {
                    if (err) cb(err)
                    else cb()
                })
            }
        }
    ], function (error, result) {
        if (error) callback(error)
        else callback(null, {})
    })
}

var checkAndAddProgram = function (userData, payloadData, userExtendedData, callback) {
    async.series([
        function (cb) {
            var criteria = {
                _id: userExtendedData._id,
                program: {
                    $elemMatch: {
                        programId: payloadData.programId
                    }
                }
            }
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length != 0) cb(ERROR.ALREADY_PROGRAM_ENROLL)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: userExtendedData._id,
                program: {
                    $elemMatch: {
                        programId: { $lt: parseInt(payloadData.programId) },
                        status: {
                            $in: [
                                CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.LOCKED,
                                CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.UNLOCKED,
                                CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE
                            ]
                        }
                    }
                }
            }
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length != 0) cb(ERROR.INCOMPLETE_PROGRAM)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: userExtendedData._id
            }
            var dataToUpdate = {
                $addToSet: {
                    program: {
                        programId: payloadData.programId,
                        status: CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE
                    }
                }
            }
            Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (error, result) {
        if (error) callback(error)
        else callback(null)
    })
}

var enrolToModule = function (userData, payloadData, callback) {
    var userFound, userPrograms, userProgramModules, programData, moduleData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            var criteria = {
                id: payloadData.programId,
                isActive: true
            }
            Service.ProgramService.getProgram(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        programData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id,
                program: { $elemMatch: { programId: payloadData.programId } }
            }
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userPrograms = data[0].program;
                        userProgramData = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) })
                        if (userProgramData.status == CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE) cb(ERROR.PROGRAM_COMPLETE)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            userProgramModules = userProgramData.module;
            if (_.findWhere(userProgramModules, { moduleId: parseInt(payloadData.moduleId) }) != undefined) cb(ERROR.ALREADY_MODULE_ENROLL)
            else if (_.findWhere(userProgramModules, { status: CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE }) != undefined) cb(ERROR.INCOMPLETE_MODULE)
            else {
                var criteria = {
                    userId: userData._id,
                    program: {
                        $elemMatch: {
                            programId: payloadData.programId
                        }
                    }
                }
                var dataToUpdate = {
                    $addToSet: {
                        "program.$[p].module": {
                            moduleId: parseInt(payloadData.moduleId),
                            status: CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE
                        }
                    }
                }
                var options = {
                    "arrayFilters": [{ "p.programId": payloadData.programId }]
                }
                Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                    if (err) cb(err)
                    else cb()
                })
            }
        }
    ], function (error, result) {
        if (error) callback(error)
        else callback(null, {})
    })
}

var addToTimeTable = function (userData, payloadData, callback) {
    var userFound, userPrograms, userProgramIds, userProgramModules, programData, moduleData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            var criteria = {
                id: payloadData.programId,
                isActive: true
            }
            Service.ProgramService.getProgram(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        programData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else {
                            if (userProgramModules.status == CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE) cb(ERROR.MODULE_COMPLETE)
                            else cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            Service.TimeTableService.getTimeTable({ id: { $in: payloadData.timeTableId } }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length != (payloadData.timeTableId).length) cb(ERROR.TIMETABLE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.TimeTableService.getTimeTable({ id: { $in: payloadData.timeTableId }, moduleId: moduleData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length != (payloadData.timeTableId).length) cb(ERROR.MODULE_TIMETABLE_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id,
                program: {
                    $elemMatch: {
                        programId: payloadData.programId,
                        module: {
                            $elemMatch: {
                                moduleId: payloadData.moduleId
                            }
                        }
                    }
                }
            }
            var dataToUpdate = {
                $set: {
                    "program.$[p].module.$[m].timeTable": payloadData.timeTableId
                }
            }
            var options = {
                "arrayFilters": [{ "p.programId": payloadData.programId }, { "m.moduleId": payloadData.moduleId }]
            }
            Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (error, result) {
        if (error) callback(error)
        else callback(null, {})
    })
}

var completeAnActivity = function (userData, payloadData, callback) {
    var userFound, userPrograms, userProgramIds, userProgramModules, programData, moduleData, userModuleActivities;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            var criteria = {
                id: payloadData.programId,
                isActive: true
            }
            Service.ProgramService.getProgram(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        programData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.getActivities({ id: payloadData.activityId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.ACTIVITY_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.getActivities({ id: payloadData.activityId, moduleId: moduleData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_ACTIVITY_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else {
                            if (userProgramModules.status == CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE) cb(ERROR.MODULE_COMPLETE)
                            else {
                                userModuleActivities = userProgramModules.activity;
                                if (_.findWhere(userModuleActivities, { activityId: payloadData.activityId }) != undefined) cb(ERROR.ACTIVITY_COMPLETE)
                                else cb()
                            }
                        }
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id,
                program: {
                    $elemMatch: {
                        programId: payloadData.programId,
                        module: {
                            $elemMatch: {
                                moduleId: payloadData.moduleId
                            }
                        }
                    }
                }
            }
            var dataToUpdate = {
                $addToSet: {
                    "program.$[p].module.$[m].activity": {
                        activityId: payloadData.activityId,
                        status: CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE
                    }
                }
            }
            var options = {
                "arrayFilters": [{ "p.programId": payloadData.programId }, { "m.moduleId": payloadData.moduleId }]
            }
            Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (error, result) {
        if (error) callback(error)
        else callback(null, {})
    })
}

var addToGoal = function (userData, payloadData, callback) {
    var userFound, userPrograms, userProgramIds, userProgramModules, programData, moduleData, userModuleGoals, goalUpdatedStatus;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            var criteria = {
                id: payloadData.programId,
                isActive: true
            }
            Service.ProgramService.getProgram(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        programData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            Service.GoalsService.getGoals({ id: payloadData.goalId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.GOAL_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.GoalsService.getGoals({ id: payloadData.goalId, moduleId: moduleData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_GOAL_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else {
                            if (userProgramModules.status == CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE) cb(ERROR.MODULE_COMPLETE)
                            else {
                                userModuleGoals = userProgramModules.goal;
                                goalUpdatedStatus = userProgramModules.goalUpdatedStatus;
                                if (userModuleGoals.length > 0 && userModuleGoals[0].status == CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE) cb(ERROR.GOAL_ALREADY_COMPLETED)
                                else cb()
                            }
                        }
                    }
                }
            })
        },
        function (cb) {
            if (goalUpdatedStatus == false && userModuleGoals.length == 0) {
                var criteria = {
                    userId: userData._id,
                    program: {
                        $elemMatch: {
                            programId: payloadData.programId,
                            module: {
                                $elemMatch: {
                                    moduleId: payloadData.moduleId
                                }
                            }
                        }
                    }
                }
                var dataToUpdate = {
                    $addToSet: {
                        "program.$[p].module.$[m].goal": {
                            goalId: payloadData.goalId,
                            status: CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE
                        }
                    }
                }
                var options = {
                    "arrayFilters": [{ "p.programId": payloadData.programId }, { "m.moduleId": payloadData.moduleId }]
                }
                Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                    if (err) cb(err)
                    else cb()
                })
            }
            else if (goalUpdatedStatus == false && userModuleGoals.length != 0) {
                var oldGoalId = userModuleGoals[0].goalId
                if (oldGoalId == payloadData.goalId) cb(ERROR.ALREADY_GOAL_SET)
                else {
                    var criteria = {
                        userId: userData._id,
                        program: {
                            $elemMatch: {
                                programId: payloadData.programId,
                                module: {
                                    $elemMatch: {
                                        moduleId: payloadData.moduleId
                                    }
                                }
                            }
                        }
                    }
                    var dataToUpdate = {
                        $pull: {
                            "program.$[p].module.$[m].goal": {
                                goalId: oldGoalId
                            }
                        }
                    }
                    var options = {
                        "arrayFilters": [{ "p.programId": payloadData.programId }, { "m.moduleId": payloadData.moduleId }]
                    }
                    Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                        if (err) cb(err)
                        else {
                            var criteria = {
                                userId: userData._id,
                                program: {
                                    $elemMatch: {
                                        programId: payloadData.programId,
                                        module: {
                                            $elemMatch: {
                                                moduleId: payloadData.moduleId
                                            }
                                        }
                                    }
                                }
                            }
                            var dataToUpdate = {
                                $set: {
                                    "program.$[p].module.$[m].goalUpdatedStatus": true
                                },
                                $addToSet: {
                                    "program.$[p].module.$[m].goal": {
                                        goalId: payloadData.goalId,
                                        status: CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.ACTIVE
                                    }
                                }
                            }
                            var options = {
                                "arrayFilters": [{ "p.programId": payloadData.programId }, { "m.moduleId": payloadData.moduleId }]
                            }
                            Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                                if (err) cb(err)
                                else cb()
                            })
                        }
                    })
                }
            }
            else {
                cb(ERROR.MULTIPLE_GOAL_UPDATE)
            }
        }
    ], function (error, result) {
        if (error) callback(error)
        else callback(null, {})
    })
}

var completeGoal = function (userData, payloadData, callback) {
    var userFound, userPrograms, userProgramIds, userProgramModules, programData, moduleData, userModuleGoals;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            var criteria = {
                id: payloadData.programId,
                isActive: true
            }
            Service.ProgramService.getProgram(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        programData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            Service.GoalsService.getGoals({ id: payloadData.goalId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.GOAL_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.GoalsService.getGoals({ id: payloadData.goalId, moduleId: moduleData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_GOAL_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else {
                            if (userProgramModules.status == CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE) cb(ERROR.MODULE_COMPLETE)
                            else {
                                userModuleGoals = userProgramModules.goal;
                                if (userModuleGoals.length == 0) cb(ERROR.GOAL_NOT_SETTED)
                                else cb()
                            }
                        }
                    }
                }
            })
        },
        function (cb) {
            if (userModuleGoals[0].goalId != payloadData.goalId) cb(ERROR.GOAL_MISMATCH)
            else if (userModuleGoals[0].goalId == payloadData.goalId && userModuleGoals[0].status == CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE) cb(ERROR.GOAL_ALREADY_COMPLETED)
            else {
                var criteria = {
                    userId: userData._id,
                    program: {
                        $elemMatch: {
                            programId: payloadData.programId,
                            module: {
                                $elemMatch: {
                                    moduleId: payloadData.moduleId,
                                    goal: {
                                        $elemMatch: {
                                            goalId: payloadData.goalId
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var dataToUpdate = {
                    $set: {
                        "program.$[p].module.$[m].goal.$[g].status": CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE
                    }
                }
                var options = {
                    "arrayFilters": [{ "p.programId": payloadData.programId }, { "m.moduleId": payloadData.moduleId }, { "g.goalId": payloadData.goalId }]
                }
                Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                    if (err) cb(err)
                    else cb()
                })
            }
        }
    ], function (error, result) {
        if (error) callback(error)
        else callback(null, {})
    })
}

var submitQuiz = function (userData, payloadData, callback) {
    var userFound, userPrograms, userProgramIds, userProgramModules, programData, moduleData, userModuleQuiz, quizData;
    var newQuiz = false;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            var criteria = {
                id: payloadData.programId,
                isActive: true
            }
            Service.ProgramService.getProgram(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        programData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            Service.QuizService.getQuiz({ id: payloadData.quizId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.QUIZ_NOT_FOUND)
                    else {
                        quizData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.QuizService.getQuiz({ id: payloadData.quizId, moduleId: moduleData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_QUIZ_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.QuestionService.getQuestion({ quizId: quizData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length != payloadData.submission.length) cb(ERROR.QUIZ_SUBMISSION_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else {
                            userModuleQuiz = _.findWhere(userProgramModules.quiz, { quizId: payloadData.quizId });
                            if (userModuleQuiz == undefined) {
                                newQuiz = true
                            }
                            else {
                                newQuiz == false
                            }
                            cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            if (newQuiz) {
                var criteria = {
                    userId: userData._id,
                    program: {
                        $elemMatch: {
                            programId: payloadData.programId,
                            module: {
                                $elemMatch: {
                                    moduleId: payloadData.moduleId
                                }
                            }
                        }
                    }
                }
                var dataToUpdate = {
                    $addToSet: {
                        "program.$[p].module.$[m].quiz": {
                            quizId: payloadData.quizId,
                            status: CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE
                        }
                    }
                }
                var options = {
                    "arrayFilters": [{ "p.programId": payloadData.programId }, { "m.moduleId": payloadData.moduleId }]
                }
                Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                    if (err) cb(err)
                    else {
                        var criteria = {
                            userId: userData._id,
                            program: {
                                $elemMatch: {
                                    programId: payloadData.programId,
                                    module: {
                                        $elemMatch: {
                                            moduleId: payloadData.moduleId,
                                            quiz: {
                                                $elemMatch: {
                                                    quizId: payloadData.quizId
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        var dataToUpdate = {
                            $addToSet: {
                                "program.$[p].module.$[m].quiz.$[q].submission": {
                                    submissionId: 1,
                                    submission: payloadData.submission
                                }
                            }
                        }
                        var options = {
                            "arrayFilters": [{ "p.programId": payloadData.programId }, { "m.moduleId": payloadData.moduleId }, { "q.quizId": payloadData.quizId }]
                        }
                        Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                            if (err) cb(err)
                            else cb()
                        })
                    }
                })
            }
            else {
                var criteria = {
                    userId: userData._id,
                    program: {
                        $elemMatch: {
                            programId: payloadData.programId,
                            module: {
                                $elemMatch: {
                                    moduleId: payloadData.moduleId,
                                    quiz: {
                                        $elemMatch: {
                                            quizId: payloadData.quizId
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var dataToUpdate = {
                    $addToSet: {
                        "program.$[p].module.$[m].quiz.$[q].submission": {
                            submissionId: (userModuleQuiz.submission.length) + 1,
                            submission: payloadData.submission
                        }
                    }
                }
                var options = {
                    "arrayFilters": [{ "p.programId": payloadData.programId }, { "m.moduleId": payloadData.moduleId }, { "q.quizId": payloadData.quizId }]
                }
                Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                    if (err) cb(err)
                    else cb()
                })
            }
        }
    ], function (error, result) {
        if (error) callback(error)
        else callback(null, {})
    })
}

var completeModule = function (userData, payloadData, callback) {
    var userFound, userPrograms, userProgramIds, userProgramModules, programData, moduleData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            var criteria = {
                id: payloadData.programId,
                isActive: true
            }
            Service.ProgramService.getProgram(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        programData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else {
                            if (userProgramModules.status == CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE) cb(ERROR.MODULE_COMPLETE)
                            else cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id,
                program: {
                    $elemMatch: {
                        programId: payloadData.programId,
                        module: {
                            $elemMatch: {
                                moduleId: payloadData.moduleId
                            }
                        }
                    }
                }
            }
            var dataToUpdate = {
                $set: {
                    "program.$[p].module.$[m].status": CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE
                }
            }
            var options = {
                "arrayFilters": [{ "p.programId": payloadData.programId }, { "m.moduleId": payloadData.moduleId }]
            }
            Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id,
                program: {
                    $elemMatch: {
                        programId: payloadData.programId
                    }
                }
            }
            var dataToUpdate = {
                $set: {
                    "program.$[p].completedModulesCount": userProgramIds.completedModulesCount + 1
                }
            }
            var options = {
                "arrayFilters": [{ "p.programId": payloadData.programId }]
            }
            Service.UserExtendedProfileService.updateUserExtendedProfile(criteria, dataToUpdate, options, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (error, result) {
        if (error) callback(error)
        else callback(null, {})
    })
}

var favouriteModule = function (userData, payloadData, callback) {
    var userFound, userPrograms, userProgramIds, userProgramModules, programData, moduleData, userExtendedProfile;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, { password: 0 }, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                        else cb();
                    }
                }
            });
        },
        function (cb) {
            var criteria = {
                id: payloadData.programId,
                isActive: true
            }
            Service.ProgramService.getProgram(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else {
                        programData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                        else cb()
                    }
                }
            })
        },
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            var projection = {}
            Service.UserExtendedProfileService.getUserExtendedProfile(criteria, projection, {}, function (err, data) {
                if (err) cb(err)
                else {
                    userPrograms = data[0].program;
                    userExtendedProfile = data[0];
                    userProgramIds = _.findWhere(userPrograms, { programId: parseInt(payloadData.programId) });
                    if (userProgramIds == undefined) cb(ERROR.PROGRAM_NOT_ENROLL)
                    else {
                        userProgramModules = _.findWhere(userProgramIds.module, { moduleId: parseInt(payloadData.moduleId) })
                        if (userProgramModules == undefined) cb(ERROR.MODULE_NOT_ENROLL)
                        else {
                            if (userProgramModules.status == CONFIG.APP_CONSTANTS.DATABASE.MODULE_STATUS.COMPLETE) cb(ERROR.MODULE_COMPLETE)
                            else cb()
                        }
                    }
                }
            })
        },
        function (cb) {
            if (_.findWhere(userExtendedProfile.favouriteModule, { id: payloadData.moduleId }) != undefined) cb(ERROR.ALREADY_FAVOURITE_MODULE)
            else {
                var criteria = {
                    _id: userExtendedProfile._id
                }
                var dataToUpdate = {
                    $addToSet: {
                        favouriteModules: {
                            programId: payloadData.programId,
                            id: payloadData.moduleId
                        }
                    }
                }

                Service.updateUserExtendedProfile.updateUserExtendedProfile(criteria, dataToUpdate, {}, function (err, data) {
                    if (err) cb(err)
                    else cb()
                })
            }
        }
    ], function (error, result) {
        if (error) callback(error)
        else callback(null, {})
    })
}

var sendTrackingData = function (userData, payloadData, callback) {
    var customerData, trackingData, programData, moduleData;
    async.series(
        [
            function (cb) {
                var query = {
                    _id: userData._id
                };
                var options = { lean: true };
                Service.UserService.getUser(query, {}, options, function (err, data) {
                    if (err) {
                        cb(err);
                    } else {
                        if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                        else {
                            customerData = (data && data[0]) || null;
                            if (customerData.isBlocked) cb(ERROR.ACCOUNT_BLOCKED);
                            else cb();
                        }
                    }
                });
            },
            function (cb) {
                var criteria = {
                    _id: payloadData.sessionId,
                    sessionStatus: CONFIG.APP_CONSTANTS.DATABASE.SESSION_STATUS.ACTIVE
                }
                Service.UserSessionService.getUserSession(criteria, {}, {}, function (err, data) {
                    if (err) cb(err)
                    else {
                        if (data.length == 0) cb(ERROR.SESSION_INACTIVE)
                        else cb()
                    }
                })
            },
            function (cb) {
                Service.ProgramService.getProgram({ id: payloadData.programId }, {}, {}, function (err, data) {
                    if (err) cb(err)
                    else {
                        if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                        else {
                            if (!data[0].isActive) cb(ERROR.PROGRAM_BLOCKED)
                            else {
                                programData = data && data[0] || null;
                                cb()
                            }
                        }
                    }
                })
            },
            function (cb) {
                Service.ModuleService.getModule({ id: payloadData.moduleId }, {}, {}, function (err, data) {
                    if (err) cb(err)
                    else {
                        if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                        else {
                            moduleData = data && data[0] || null;
                            cb()
                        }
                    }
                })
            },
            function (cb) {
                Service.ModuleService.getModule({ _id: moduleData._id, programId: programData._id }, {}, {}, function (err, data) {
                    if (err) cb(err)
                    else {
                        if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                        else {
                            if (!data[0].isActive) cb(ERROR.MODULE_BLOCKED)
                            else cb()
                        }
                    }
                })
            },
            function (cb) {
                var dataToSave = {
                    userId: userData._id,
                    sessionId: payloadData.sessionId,
                    trackingType: payloadData.trackingType,
                    programId: payloadData.programId,
                    moduleId: payloadData.moduleId
                }
                if (payloadData.hasOwnProperty("linkToTrack") && payloadData.linkToTrack != null && payloadData.linkToTrack != undefined && payloadData.linkToTrack != "") {
                    dataToSave.linkToTrack = payloadData.linkToTrack
                }
                Service.UserTrackingService.createUserTracking(dataToSave, function (err, data) {
                    if (err) cb(err)
                    else {
                        trackingData = data;
                        cb()
                    }
                })
            },
            function (cb) {
                if (payloadData.hasOwnProperty("misc") && payloadData.misc.length != 0) {
                    if (payloadData.misc) {
                        var taskInSubcat = [];
                        for (var key in payloadData.misc) {
                            (function (key) {
                                taskInSubcat.push((function (key) {
                                    return function (embeddedCb) {
                                        //TODO
                                        var criteria = {
                                            _id: trackingData._id
                                        }
                                        var dataToUpdate = {
                                            $addToSet: {
                                                misc: payloadData.misc[key]
                                            }
                                        }
                                        Service.UserTrackingService.updateUserTracking(criteria, dataToUpdate, {}, function (err, data) {
                                            if (err) embeddedCb(err)
                                            else embeddedCb()
                                        })
                                    }
                                })(key))
                            }(key));
                        }
                        async.parallel(taskInSubcat, function (err, result) {
                            cb();
                        });
                    }
                }
                else cb()
            }
        ],
        function (error, result) {
            if (error) {
                return callback(error);
            } else {
                return callback(null);
            }
        }
    );
}


module.exports = {
    getPrograms: getPrograms,
    getModules: getModules,
    getSpecificModule: getSpecificModule,
    getModuleTimeTable: getModuleTimeTable,
    getModuleActivities: getModuleActivities,
    getModuleActivityContent: getModuleActivityContent,
    getModuleGoals: getModuleGoals,
    getModuleQuiz: getModuleQuiz,
    getModuleQuizQuestion: getModuleQuizQuestion,
    enrolToProgram: enrolToProgram,
    enrolToModule: enrolToModule,
    addToTimeTable: addToTimeTable,
    completeAnActivity: completeAnActivity,
    addToGoal: addToGoal,
    completeGoal: completeGoal,
    submitQuiz: submitQuiz,
    completeModule: completeModule,
    favouriteModule: favouriteModule,
    sendTrackingData: sendTrackingData
};