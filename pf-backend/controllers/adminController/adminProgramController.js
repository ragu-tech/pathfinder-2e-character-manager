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
var TokenManager = require("../../lib/tokenManager");
var CodeGenerator = require("../../lib/codeGenerator");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var _ = require("underscore");
var Config = require("../../config");

var createProgram = function (userData, payloadData, callback) {
    var programData, customerData;
    async.series([
        function (cb) {
            var query = {
                _id: userData._id
            };
            var options = { lean: true };
            Service.AdminService.getAdmin(query, {}, options, function (err, data) {
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
            Service.ProgramService.createProgram(payloadData, function (err, data) {
                if (err) cb(err)
                else {
                    programData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { programData: programData })
    })
}

var getPrograms = function (userData, callback) {
    var customerData, programData;
    async.series([
        function (cb) {
            var query = {
                _id: userData._id
            };
            var options = { lean: true };
            Service.AdminService.getAdmin(query, {}, options, function (err, data) {
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
            Service.ProgramService.getProgram({}, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    programData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { programData: programData })
    })
}

var blockUnblockProgram = function (userData, payloadData, callback) {
    var userFound
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.programId
            }
            var dataToUpdate = {
                $set: {
                    isActive: payloadData.isActive
                }
            }
            Service.ProgramService.updateProgram(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var updateProgram = function (userData, payloadData, callback) {
    var userFound, programData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var dataToUpdate
            if (payloadData.hasOwnProperty("programImage") && (payloadData.programImage != null && payloadData.programImage != undefined)) {
                dataToUpdate = {
                    title: payloadData.title,
                    description: payloadData.description,
                    programImage: payloadData.programImage,
                    updatedAt: new Date().toISOString()
                }
            }
            else {
                dataToUpdate = {
                    title: payloadData.title,
                    description: payloadData.description,
                    updatedAt: new Date().toISOString()
                }
            }

            Service.ProgramService.updateProgram({ _id: payloadData.programId }, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    programData = data && data[0] || null;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { programData: programData })
    })
}

var createModule = function (userData, payloadData, callback) {
    var userFound, moduleData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var moduleCreate = {
                programId: payloadData.programId,
                title: payloadData.title,
                description: payloadData.description
            }
            if (payloadData.hasOwnProperty("moduleImage") && (payloadData.moduleImage != null || payloadData.moduleImage != undefined)) {
                moduleCreate.moduleImage = payloadData.moduleImage
            }
            Service.ModuleService.createModule(moduleCreate, function (err, data) {
                if (err) cb(err)
                else {
                    moduleData = data;
                    cb()
                }
            })
        },
        function (cb) {
            if (payloadData.hasOwnProperty("content") && payloadData.content.length != 0) {
                if (payloadData.content) {
                    var taskInParallel = [];
                    for (var key in payloadData.content) {
                        (function (key) {
                            taskInParallel.push((function (key) {
                                return function (embeddedCB) {
                                    //TODO
                                    var dataToUpdate = {
                                        $addToSet: {
                                            content: {
                                                type: payloadData.content[key].type,
                                                content: payloadData.content[key].content,
                                                position: payloadData.content[key].position
                                            }
                                        }
                                    }
                                    var criteria = {
                                        _id: moduleData._id
                                    }
                                    Service.ModuleService.updateModule(criteria, dataToUpdate, {}, function (err, data) {
                                        if (err) embeddedCB(err)
                                        else {
                                            if (payloadData.content[key].hasOwnProperty("misc") && payloadData.content[key].misc.length != 0) {
                                                addMiscToModuleContent(moduleData, payloadData.content[key].misc, data.content[key], function (err, data) {
                                                    if (err) embeddedCB(err)
                                                    else embeddedCB()
                                                })
                                            }
                                            else embeddedCB()
                                        }
                                    })
                                }
                            })(key))
                        }(key));
                    }
                    async.series(taskInParallel, function (err, result) {
                        cb(null);
                    });
                }
            }
            else cb()
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: moduleData._id }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    moduleData = data && data[0] || null;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { moduleData: moduleData })
    })
}

var addMiscToModuleContent = function (moduleData, miscData, contentData, callback) {
    async.series([
        function (cb) {
            var taskInParallel = [];
            for (var key in miscData) {
                (function (key) {
                    taskInParallel.push((function (key) {
                        return function (embeddedCB) {
                            //TODO
                            var criteria = {
                                _id: moduleData._id,
                                "content._id": contentData._id
                            }
                            var dataToUpdate = {
                                $addToSet: {
                                    "content.$.misc": {
                                        key: miscData[key].key,
                                        content: miscData[key].content,
                                        subText: miscData[key].subText,
                                        redirect: miscData[key].redirect
                                    }
                                }
                            }
                            Service.ModuleService.updateModule(criteria, dataToUpdate, {}, function (err, data) {
                                if (err) embeddedCB(err)
                                else embeddedCB()
                            })
                        }
                    })(key))
                }(key));
            }
            async.series(taskInParallel, function (err, result) {
                cb(null);
            });
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var getModules = function (userData, payloadData, callback) {
    var userFound, moduleData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ programId: payloadData.programId }, {
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
                    moduleData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { moduleData: moduleData })
    })
}

var blockUnblockModule = function (userData, payloadData, callback) {
    var userFound;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.moduleId
            }
            var dataToUpdate = {
                $set: {
                    isActive: payloadData.isActive
                }
            }
            Service.ModuleService.updateModule(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var getSpecificModule = function (userData, payloadData, callback) {
    var userFound, moduleData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    moduleData = data && data[0] || null;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { moduleData: moduleData })
    })
}

var updateModule = function (userData, payloadData, callback) {
    var userFound, moduleData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            var dataToUpdate
            if (payloadData.hasOwnProperty("moduleImage") && (payloadData.moduleImage != null && payloadData.moduleImage != undefined)) {
                dataToUpdate = {
                    title: payloadData.title,
                    description: payloadData.description,
                    moduleImage: payloadData.moduleImage,
                    updatedAt: new Date().toISOString()
                }
            }
            else {
                dataToUpdate = {
                    title: payloadData.title,
                    description: payloadData.description,
                    updatedAt: new Date().toISOString()
                }
            }

            Service.ModuleService.updateModule({ _id: payloadData.moduleId }, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    moduleData = data && data[0] || null;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { moduleData: moduleData })
    })
}

var updateModuleContent = function (userData, payloadData, callback) {
    var userFound, moduleData, moduleDataFinal;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        moduleData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ModuleService.updateModule({ _id: payloadData.moduleId }, { $unset: { content: 1 } }, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        },
        function (cb) {
            if (payloadData.content) {
                var taskInParallel = [];
                for (var key in payloadData.content) {
                    (function (key) {
                        taskInParallel.push((function (key) {
                            return function (embeddedCB) {
                                //TODO
                                var dataToUpdate = {
                                    $addToSet: {
                                        content: {
                                            type: payloadData.content[key].type,
                                            content: payloadData.content[key].content,
                                            position: payloadData.content[key].position
                                        }
                                    }
                                }
                                var criteria = {
                                    _id: moduleData._id
                                }
                                Service.ModuleService.updateModule(criteria, dataToUpdate, {}, function (err, data) {
                                    if (err) embeddedCB(err)
                                    else {
                                        if (payloadData.content[key].hasOwnProperty("misc") && payloadData.content[key].misc.length != 0) {
                                            addMiscToModuleContent(moduleData, payloadData.content[key].misc, data.content[key], function (err, data) {
                                                if (err) embeddedCB(err)
                                                else embeddedCB()
                                            })
                                        }
                                        else embeddedCB()
                                    }
                                })
                            }
                        })(key))
                    }(key));
                }
                async.series(taskInParallel, function (err, result) {
                    cb(null);
                });
            }
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    moduleDataFinal = data && data[0] || null;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { moduleData: moduleDataFinal })
    })
}

var createTimeTable = function (userData, payloadData, callback) {
    var userFound, timeTableData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            var dataToSave = {
                moduleId: payloadData.moduleId,
                title: payloadData.title
            }
            if (payloadData.hasOwnProperty("description") && payloadData.description != null && payloadData.description != undefined && payloadData.description != "") {
                dataToSave.description = payloadData.description
            }

            Service.TimeTableService.createTimeTable(dataToSave, function (err, data) {
                if (err) cb(err)
                else {
                    timeTableData = data;
                    cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.moduleId
            }
            var dataToUpdate = {
                $addToSet: {
                    timetable: timeTableData._id
                }
            }
            Service.ModuleService.updateModule(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { timeTableData: timeTableData })
    })
}

var getTimeTable = function (userData, payloadData, callback) {
    var userFound, timeTableData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.TimeTableService.getTimeTable({ moduleId: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    timeTableData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { timeTableData: timeTableData })
    })
}

var blockUnblockTimeTable = function (userData, payloadData, callback) {
    var userFound
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.TimeTableService.getTimeTable({ _id: payloadData.timeTableId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.TIMETABLE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.timeTableId
            }
            var dataToUpdate = {
                $set: {
                    isActive: payloadData.isActive
                }
            }
            Service.TimeTableService.updateTimeTable(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var updateTimeTable = function (userData, payloadData, callback) {
    var userFound
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.TimeTableService.getTimeTable({ _id: payloadData.timeTableId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.TIMETABLE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.timeTableId
            }
            var dataToUpdate
            if (payloadData.hasOwnProperty("description") && payloadData.description != null && payloadData.description != undefined && payloadData.description != "") {
                dataToUpdate = {
                    $set: {
                        title: payloadData.title,
                        description: payloadData.description
                    }
                }
            }
            else {
                dataToUpdate = {
                    $set: {
                        title: payloadData.title
                    }
                }
            }
            Service.TimeTableService.updateTimeTable(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var createActivities = function (userData, payloadData, callback) {
    var userFound, activitiesData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            var dataToSave = {
                moduleId: payloadData.moduleId,
                title: payloadData.title
            }
            if (payloadData.hasOwnProperty("description") && payloadData.description != null && payloadData.description != undefined && payloadData.description != "") {
                dataToSave.description = payloadData.description
            }

            Service.ActivitiesService.createActivities(dataToSave, function (err, data) {
                if (err) cb(err)
                else {
                    activitiesData = data;
                    cb()
                }
            })
        },
        function (cb) {
            if (payloadData.hasOwnProperty("content") && payloadData.content.length != 0) {
                if (payloadData.content) {
                    var taskInParallel = [];
                    for (var key in payloadData.content) {
                        (function (key) {
                            taskInParallel.push((function (key) {
                                return function (embeddedCB) {
                                    //TODO
                                    var dataToUpdate = {
                                        $addToSet: {
                                            content: {
                                                type: payloadData.content[key].type,
                                                content: payloadData.content[key].content,
                                                position: payloadData.content[key].position
                                            }
                                        }
                                    }
                                    var criteria = {
                                        _id: activitiesData._id
                                    }
                                    Service.ActivitiesService.updateActivities(criteria, dataToUpdate, {}, function (err, data) {
                                        if (err) embeddedCB(err)
                                        else {
                                            if (payloadData.content[key].hasOwnProperty("misc") && payloadData.content[key].misc.length != 0) {
                                                addMiscToActivityContent(activitiesData, payloadData.content[key].misc, data.content[key], function (err, data) {
                                                    if (err) embeddedCB(err)
                                                    else embeddedCB()
                                                })
                                            }
                                            else embeddedCB()
                                        }
                                    })
                                }
                            })(key))
                        }(key));
                    }
                    async.series(taskInParallel, function (err, result) {
                        cb(null);
                    });
                }
            }
            else cb()
        },
        function (cb) {
            var criteria = {
                _id: payloadData.moduleId
            }
            var dataToUpdate = {
                $addToSet: {
                    activities: activitiesData._id
                }
            }
            Service.ModuleService.updateModule(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        },
        function (cb) {
            var criteria = {
                _id: activitiesData._id
            }
            Service.ActivitiesService.getActivities(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    activitiesData = data && data[0] || null
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { activitiesData: activitiesData })
    })
}

var addMiscToActivityContent = function (activitiesData, miscData, contentData, callback) {
    async.series([
        function (cb) {
            var taskInParallel = [];
            for (var key in miscData) {
                (function (key) {
                    taskInParallel.push((function (key) {
                        return function (embeddedCB) {
                            //TODO
                            var criteria = {
                                _id: activitiesData._id,
                                "content._id": contentData._id
                            }
                            var dataToUpdate = {
                                $addToSet: {
                                    "content.$.misc": {
                                        key: miscData[key].key,
                                        content: miscData[key].content,
                                        subText: miscData[key].subText,
                                        redirect: miscData[key].redirect
                                    }
                                }
                            }
                            Service.ActivitiesService.updateActivities(criteria, dataToUpdate, {}, function (err, data) {
                                if (err) embeddedCB(err)
                                else embeddedCB()
                            })
                        }
                    })(key))
                }(key));
            }
            async.series(taskInParallel, function (err, result) {
                cb(null);
            });
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var getActivities = function (userData, payloadData, callback) {
    var userFound, activitiesData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.getActivities({ moduleId: payloadData.moduleId }, { title: 1, description: 1, id: 1 }, {}, function (err, data) {
                if (err) cb(err)
                else {
                    activitiesData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { activitiesData: activitiesData })
    })
}

var getSpecificActivities = function (userData, payloadData, callback) {
    var userFound, activitiesData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.getActivities({ _id: payloadData.activityId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.ACTIVITY_NOT_FOUND)
                    else {
                        activitiesData = data && data[0] || null;
                        cb()
                    }
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { activitiesData: activitiesData })
    })
}

var blockUnblockActivity = function (userData, payloadData, callback) {
    var userFound;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.getActivities({ _id: payloadData.activityId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.ACTIVITY_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.activityId
            }
            var dataToUpdate = {
                $set: {
                    isActive: payloadData.isActive
                }
            }
            Service.ActivitiesService.updateActivities(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var updateActivity = function (userData, payloadData, callback) {
    var userFound;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.getActivities({ _id: payloadData.activityId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.ACTIVITY_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.activityId
            }
            var dataToUpdate = {
                $set: {
                    title: payloadData.title
                }
            }
            if (payloadData.hasOwnProperty("description") && payloadData.description != null && payloadData.description != undefined && payloadData.description != "") {
                dataToUpdate.description = payloadData.description
            }
            Service.ActivitiesService.updateActivities(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var updateActivityContent = function (userData, payloadData, callback) {
    var userFound, activityData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.getActivities({ _id: payloadData.activityId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.ACTIVITY_NOT_FOUND)
                    else {
                        activityData = data && data[0] || null;
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.ActivitiesService.updateActivities({ _id: activityData._id }, { $unset: { content: 1 } }, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        },
        function (cb) {
            if (payloadData.content) {
                var taskInParallel = [];
                for (var key in payloadData.content) {
                    (function (key) {
                        taskInParallel.push((function (key) {
                            return function (embeddedCB) {
                                //TODO
                                var dataToUpdate = {
                                    $addToSet: {
                                        content: {
                                            type: payloadData.content[key].type,
                                            content: payloadData.content[key].content,
                                            position: payloadData.content[key].position
                                        }
                                    }
                                }
                                var criteria = {
                                    _id: activityData._id
                                }
                                Service.ActivitiesService.updateActivities(criteria, dataToUpdate, {}, function (err, data) {
                                    if (err) embeddedCB(err)
                                    else {
                                        if (payloadData.content[key].hasOwnProperty("misc") && payloadData.content[key].misc.length != 0) {
                                            addMiscToActivityContent(activityData, payloadData.content[key].misc, data.content[key], function (err, data) {
                                                if (err) embeddedCB(err)
                                                else embeddedCB()
                                            })
                                        }
                                        else embeddedCB()
                                    }
                                })
                            }
                        })(key))
                    }(key));
                }
                async.series(taskInParallel, function (err, result) {
                    cb(null);
                });
            }
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    moduleDataFinal = data && data[0] || null;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var createGoals = function (userData, payloadData, callback) {
    var userFound, goalsData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            var dataToSave = {
                moduleId: payloadData.moduleId,
                text: payloadData.text
            }
            if (payloadData.hasOwnProperty("color") && payloadData.color != null && payloadData.color != undefined && payloadData.color != "") {
                dataToSave.color = payloadData.color
            }
            if (payloadData.hasOwnProperty("image") && payloadData.image != null && payloadData.image != undefined && payloadData.image != "") {
                dataToSave.image = payloadData.image
            }
            Service.GoalsService.createGoals(dataToSave, function (err, data) {
                if (err) cb(err)
                else {
                    goalsData = data;
                    cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.moduleId
            }
            var dataToUpdate = {
                $addToSet: {
                    goals: goalsData._id
                }
            }
            Service.ModuleService.updateModule(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { goalsData: goalsData })
    })
}

var getGoals = function (userData, payloadData, callback) {
    var userFound, goalsData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.GoalsService.getGoals({ moduleId: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    goalsData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { goalsData: goalsData })
    })
}

var blockUnblockGoals = function (userData, payloadData, callback) {
    var userFound
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.GoalsService.getGoals({ _id: payloadData.goalId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.GOAL_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.goalId
            }
            var dataToUpdate = {
                $set: {
                    isActive: payloadData.isActive
                }
            }
            Service.GoalsService.updateGoals(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var updateGoals = function (userData, payloadData, callback) {
    var userFound, goalsData;
    var multiUpdate = false;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.GoalsService.getGoals({ _id: payloadData.goalId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.GOAL_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.goalId
            }
            var dataToUpdate
            if (payloadData.hasOwnProperty("color") && payloadData.color != null && payloadData.color != undefined && payloadData.color != "") {
                multiUpdate = true;
                dataToUpdate = {
                    $set: {
                        text: payloadData.text,
                        color: payloadData.color
                    }
                }
            }
            if (payloadData.hasOwnProperty("image") && payloadData.image != null && payloadData.image != undefined && payloadData.image != "") {
                multiUpdate = true;
                dataToUpdate = {
                    $set: {
                        text: payloadData.text,
                        image: payloadData.image
                    }
                }
            }
            if (payloadData.hasOwnProperty("color") && payloadData.color != null && payloadData.color != undefined && payloadData.color != "" && payloadData.hasOwnProperty("image") && payloadData.image != null && payloadData.image != undefined && payloadData.image != "") {
                multiUpdate = true;
                dataToUpdate = {
                    $set: {
                        text: payloadData.text,
                        color: payloadData.color,
                        image: payloadData.image
                    }
                }
            }
            if (!multiUpdate) {
                dataToUpdate = {
                    $set: {
                        text: payloadData.text
                    }
                }
            }
            Service.GoalsService.updateGoals(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else {
                    goalsData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { goalsData: goalsData })
    })
}

var createQuiz = function (userData, payloadData, callback) {
    var userFound, quizData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            var dataToSave = {
                moduleId: payloadData.moduleId,
                title: payloadData.title
            }
            if (payloadData.hasOwnProperty("description") && payloadData.description != null && payloadData.description != undefined && payloadData.description != "") {
                dataToSave.description = payloadData.description
            }
            Service.QuizService.createQuiz(dataToSave, function (err, data) {
                if (err) cb(err)
                else {
                    quizData = data;
                    cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.moduleId
            }
            var dataToUpdate = {
                $addToSet: {
                    quizes: quizData._id
                }
            }
            Service.ModuleService.updateModule(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { quizData: quizData })
    })
}

var getQuiz = function (userData, payloadData, callback) {
    var userFound, quizData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.QuizService.getQuiz({ moduleId: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    quizData = data;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { quizData: quizData })
    })
}

var blockUnblockQuiz = function (userData, payloadData, callback) {
    var userFound
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function (cb) {
            Service.QuizService.getQuiz({ _id: payloadData.quizId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.QUIZ_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.quizId
            }
            var dataToUpdate = {
                $set: {
                    isActive: payloadData.isActive
                }
            }
            Service.QuizService.updateQuiz(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

var createQuestion = function (userData, payloadData, callback) {
    var userFound, questionData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function(cb){
            Service.QuizService.getQuiz({_id: payloadData.quizId},{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length == 0) cb(ERROR.QUIZ_NOT_FOUND)
                    else cb()
                }
            })
        },
        function(cb){
            Service.QuizService.getQuiz({_id: payloadData.quizId,moduleId: payloadData.moduleId},{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length == 0) cb(ERROR.MODULE_QUIZ_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            var dataToSave = {
                quizId: payloadData.quizId,
                question: payloadData.question,
                questionType: payloadData.questionType,
                answerId: payloadData.answerId,
            }
            Service.QuestionService.createQuestion(dataToSave, function (err, data) {
                if (err) cb(err)
                else {
                    questionData = data;
                    cb()
                }
            })
        },
        function (cb) {
            var taskInParallel = [];
            for (var key in payloadData.options) {
                (function (key) {
                    taskInParallel.push((function (key) {
                        return function (embeddedCB) {
                            //TODO
                            var dataToUpdate = {
                                $addToSet: {
                                    options: payloadData.options[key]
                                }
                            }
                            var criteria = {
                                _id: questionData._id
                            }
                            Service.QuestionService.updateQuestion(criteria, dataToUpdate, {}, function (err, data) {
                                if (err) embeddedCB(err)
                                else embeddedCB()
                            })
                        }
                    })(key))
                }(key));
            }
            async.series(taskInParallel, function (err, result) {
                cb(null);
            });
        },
        function (cb) {
            var criteria = {
                _id: payloadData.quizId
            }
            var dataToUpdate = {
                $addToSet: {
                    question: questionData._id
                }
            }
            Service.QuizService.updateQuiz(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        },
        function (cb) {
            var criteria = {
                _id: questionData._id
            }
            Service.QuestionService.getQuestion(criteria, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    questionData = data && data[0] || null;
                    cb()
                }
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null, { questionData: questionData })
    })
}

var getQuestion = function (userData, payloadData, callback) {
    var userFound, questionData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function(cb){
            Service.QuizService.getQuiz({_id: payloadData.quizId},{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length == 0) cb(ERROR.QUIZ_NOT_FOUND)
                    else cb()
                }
            })
        },
        function(cb){
            Service.QuizService.getQuiz({_id: payloadData.quizId,moduleId: payloadData.moduleId},{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length == 0) cb(ERROR.MODULE_QUIZ_MISMATCH)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.QuestionService.getQuestion({ quizId: payloadData.quizId }, {}, {}, function (err, data) {
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

var blockUnblockQuestion = function (userData, payloadData, callback) {
    var userFound
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else {
                        userFound = (data && data[0]) || null;
                        if (userFound.isBlocked == true) cb(ERROR.ACCOUNT_BLOCKED)
                        else cb()
                    }
                }
            });
        },
        function (cb) {
            Service.ProgramService.getProgram({ _id: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.MODULE_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            Service.ModuleService.getModule({ _id: payloadData.moduleId, programId: payloadData.programId }, {}, {}, function (err, data) {
                if (err) cb(err)
                else {
                    if (data.length == 0) cb(ERROR.PROGRAM_MODULE_MISMATCH)
                    else {
                        cb()
                    }
                }
            })
        },
        function(cb){
            Service.QuizService.getQuiz({_id: payloadData.quizId},{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length == 0) cb(ERROR.QUIZ_NOT_FOUND)
                    else cb()
                }
            })
        },
        function(cb){
            Service.QuizService.getQuiz({_id: payloadData.quizId,moduleId: payloadData.moduleId},{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length == 0) cb(ERROR.MODULE_QUIZ_MISMATCH)
                    else cb()
                }
            })
        },
        function(cb){
            Service.QuestionService.getQuestion({_id: payloadData.questionId},{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length == 0) cb(ERROR.QUESTION_NOT_FOUND)
                    else cb()
                }
            })
        },
        function (cb) {
            var criteria = {
                _id: payloadData.questionId
            }
            var dataToUpdate = {
                $set: {
                    isActive: payloadData.isActive
                }
            }
            Service.QuestionService.updateQuestion(criteria, dataToUpdate, {}, function (err, data) {
                if (err) cb(err)
                else cb()
            })
        }
    ], function (err, result) {
        if (err) callback(err)
        else callback(null)
    })
}

module.exports = {
    createProgram: createProgram,
    getPrograms: getPrograms,
    blockUnblockProgram: blockUnblockProgram,
    updateProgram: updateProgram,
    createModule: createModule,
    getModules: getModules,
    blockUnblockModule: blockUnblockModule,
    getSpecificModule: getSpecificModule,
    updateModule: updateModule,
    updateModuleContent: updateModuleContent,
    createTimeTable: createTimeTable,
    getTimeTable: getTimeTable,
    blockUnblockTimeTable: blockUnblockTimeTable,
    updateTimeTable: updateTimeTable,
    createActivities: createActivities,
    getActivities: getActivities,
    getSpecificActivities: getSpecificActivities,
    blockUnblockActivity: blockUnblockActivity,
    updateActivity: updateActivity,
    updateActivityContent: updateActivityContent,
    createGoals: createGoals,
    getGoals: getGoals,
    blockUnblockGoals: blockUnblockGoals,
    updateGoals: updateGoals,
    createQuiz: createQuiz,
    getQuiz: getQuiz,
    blockUnblockQuiz: blockUnblockQuiz,
    createQuestion: createQuestion,
    getQuestion: getQuestion,
    blockUnblockQuestion: blockUnblockQuestion
};