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

var UniversalFunctions = require("../../utils/universalFunctions");
var Controller = require("../../controllers");
var Joi = require("joi");
var Config = require("../../config");

var createProgram = {
    method: "POST",
    path: "/api/admin/program/createProgram",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.createProgram(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "create programs",
        tags: ["api", "admin", "program"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: {
                title: Joi.string().required(),
                description: Joi.string().required(),
                programImage: Joi.object().keys({
                    original: Joi.string().optional().allow(""),
                    thumbnail: Joi.string().optional().allow("")
                }).optional()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var getPrograms = {
    method: "GET",
    path: "/api/admin/program/getPrograms",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.getPrograms(userData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get all programs",
        tags: ["api", "admin", "program"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var blockUnblockProgram = {
    method: "PUT",
    path: "/api/admin/program/blockUnblockProgram",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.blockUnblockProgram(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "block/unblock a program",
        tags: ["api", "admin", "program"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: {
                programId: Joi.string().required(),
                isActive: Joi.boolean().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var updateProgram = {
    method: "PUT",
    path: "/api/admin/program/updateProgram",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.updateProgram(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "update a program",
        tags: ["api", "admin", "program"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: {
                programId: Joi.string().required(),
                title: Joi.string().required(),
                description: Joi.string().required(),
                programImage: Joi.object().keys({
                    original: Joi.string().optional().allow(""),
                    thumbnail: Joi.string().optional().allow("")
                }).optional()

            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var createModule = {
    method: "POST",
    path: "/api/admin/program/{programId}/createModule",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.createModule(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "create modules",
        tags: ["api", "admin", "module"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required()
            },
            payload: {
                title: Joi.string().required(),
                description: Joi.string().required(),
                moduleImage: Joi.object().keys({
                    original: Joi.string().optional().allow(""),
                    thumbnail: Joi.string().optional().allow("")
                }).optional(),
                content: Joi.array().items(
                    Joi.object().keys({
                        type: Joi.string().optional().valid([
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.CAROUSEL,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.HTML,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.IMAGE,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.TEXT,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.VIDEO
                        ]),
                        content: Joi.string().optional(),
                        position: Joi.number().optional(),
                        misc: Joi.array().items(
                            Joi.object().keys({
                                key: Joi.number().optional(),
                                content: Joi.string().optional(),
                                subText: Joi.string().optional(),
                                redirect: Joi.string().optional()
                            })
                        ).optional()
                    })
                ).optional()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var getModules = {
    method: "GET",
    path: "/api/admin/program/{programId}/module",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.params;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.getModules(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get all modules for a program",
        tags: ["api", "admin", "module"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var blockUnblockModule = {
    method: "PUT",
    path: "/api/admin/program/{programId}/blockUnblockModule",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.blockUnblockModule(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "block/unblock a module",
        tags: ["api", "admin", "module"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required()
            },
            payload: {
                moduleId: Joi.string().required(),
                isActive: Joi.boolean().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var getSpecificModule = {
    method: "GET",
    path: "/api/admin/program/{programId}/module/{moduleId}",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.params;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.getSpecificModule(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get specific modules for a program",
        tags: ["api", "admin", "module"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var updateModule = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/updateModule",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.updateModule(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "update basic parts of a module",
        tags: ["api", "admin", "module"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                title: Joi.string().required(),
                description: Joi.string().required(),
                moduleImage: Joi.object().keys({
                    original: Joi.string().optional().allow(""),
                    thumbnail: Joi.string().optional().allow("")
                }).optional(),
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var updateModuleContent = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/updateModuleContent",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.updateModuleContent(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "update basic parts of a module",
        tags: ["api", "admin", "module"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                content: Joi.array().items(
                    Joi.object().keys({
                        type: Joi.string().required().valid([
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.CAROUSEL,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.HTML,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.IMAGE,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.TEXT,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.VIDEO
                        ]),
                        content: Joi.string().required(),
                        position: Joi.number().required(),
                        misc: Joi.array().items(
                            Joi.object().keys({
                                key: Joi.number().optional(),
                                content: Joi.string().optional(),
                                subText: Joi.string().optional(),
                                redirect: Joi.string().optional()
                            })
                        ).optional()
                    })
                ).required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var createTimeTable = {
    method: "POST",
    path: "/api/admin/program/{programId}/module/{moduleId}/createTimeTable",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.createTimeTable(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "add timetable to module",
        tags: ["api", "admin", "timetable"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                title: Joi.string().required(),
                description: Joi.string().optional().allow("")
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var getTimeTable = {
    method: "GET",
    path: "/api/admin/program/{programId}/module/{moduleId}/getTimeTable",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.params;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.getTimeTable(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "get Time Table to module",
        tags: ["api", "admin", "timetable "],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var blockUnblockTimeTable = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/blockUnblockTimeTable",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.blockUnblockTimeTable(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "block or unblock a timetable",
        tags: ["api", "admin", "timetable"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                timeTableId: Joi.string().required(),
                isActive: Joi.boolean().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var updateTimeTable = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/updateTimeTable",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.updateTimeTable(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "update a timetable",
        tags: ["api", "admin", "timetable"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                timeTableId: Joi.string().required(),
                title: Joi.string().required(),
                description: Joi.string().optional().allow("")
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var createActivities = {
    method: "POST",
    path: "/api/admin/program/{programId}/module/{moduleId}/createActivities",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.createActivities(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "add activities to module",
        tags: ["api", "admin", "activities"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                title: Joi.string().required(),
                description: Joi.string().optional().allow(""),
                content: Joi.array().items(
                    Joi.object().keys({
                        type: Joi.string().optional().valid([
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.CAROUSEL,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.HTML,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.IMAGE,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.TEXT,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.VIDEO
                        ]),
                        content: Joi.string().optional(),
                        position: Joi.number().optional(),
                        misc: Joi.array().items(
                            Joi.object().keys({
                                key: Joi.number().optional(),
                                content: Joi.string().optional(),
                                subText: Joi.string().optional(),
                                redirect: Joi.string().optional()
                            })
                        ).optional()
                    })
                ).optional()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var getActivities = {
    method: "GET",
    path: "/api/admin/program/{programId}/module/{moduleId}/activity",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.params;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.getActivities(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "get activities to module",
        tags: ["api", "admin", "activities"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var getSpecificActivities = {
    method: "GET",
    path: "/api/admin/program/{programId}/module/{moduleId}/activity/{activityId}",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.params;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.getSpecificActivities(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "get specific activities of module",
        tags: ["api", "admin", "activities"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required(),
                activityId: Joi.string().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var blockUnblockActivity = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/blockUnblockActivity",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.blockUnblockActivity(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "block or unblock a activity",
        tags: ["api", "admin", "activities"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                activityId: Joi.string().required(),
                isActive: Joi.boolean().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var updateActivity = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/activity/{activityId}/updateActivity",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId;
        payloadData.activityId = request.params.activityId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.updateActivity(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "update basic parts of a module",
        tags: ["api", "admin", "activity"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required(),
                activityId: Joi.string().required()
            },
            payload: {
                title: Joi.string().required(),
                description: Joi.string().optional().allow(""),
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var updateActivityContent = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/activity/{activityId}/updateActivityContent",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId;
        payloadData.activityId = request.params.activityId;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.updateActivityContent(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "update basic parts of a module",
        tags: ["api", "admin", "activity"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required(),
                activityId: Joi.string().required()
            },
            payload: {
                content: Joi.array().items(
                    Joi.object().keys({
                        type: Joi.string().required().valid([
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.CAROUSEL,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.HTML,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.IMAGE,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.TEXT,
                            Config.APP_CONSTANTS.DATABASE.CONTENT_TYPES.VIDEO
                        ]),
                        content: Joi.string().required(),
                        position: Joi.number().required(),
                        misc: Joi.array().items(
                            Joi.object().keys({
                                key: Joi.number().optional(),
                                content: Joi.string().optional(),
                                subText: Joi.string().optional(),
                                redirect: Joi.string().optional()
                            })
                        ).optional()
                    })
                ).required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var createGoals = {
    method: "POST",
    path: "/api/admin/program/{programId}/module/{moduleId}/createGoals",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.createGoals(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "add goals to module",
        tags: ["api", "admin", "goals"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                text: Joi.string().required(),
                color: Joi.string().optional().allow(""),
                image: Joi.string().optional().allow("")
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var getGoals = {
    method: "GET",
    path: "/api/admin/program/{programId}/module/{moduleId}/getGoals",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.params;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.getGoals(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "get goals to module",
        tags: ["api", "admin", "goals "],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var blockUnblockGoals = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/blockUnblockGoals",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.blockUnblockGoals(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "block or unblock a goal",
        tags: ["api", "admin", "goals"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                goalId: Joi.string().required(),
                isActive: Joi.boolean().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var updateGoals = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/updateGoals",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.updateGoals(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "update a goals",
        tags: ["api", "admin", "goals"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                goalId: Joi.string().required(),
                text: Joi.string().required(),
                color: Joi.string().optional().allow(""),
                image: Joi.string().optional().allow("")
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var createQuiz = {
    method: "POST",
    path: "/api/admin/program/{programId}/module/{moduleId}/createQuiz",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.createQuiz(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "add quiz to module",
        tags: ["api", "admin", "quiz"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                title: Joi.string().required(),
                description: Joi.string().optional().allow("")
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var getQuiz = {
    method: "GET",
    path: "/api/admin/program/{programId}/module/{moduleId}/quiz",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.params;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.getQuiz(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "get quiz to module",
        tags: ["api", "admin", "quiz"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var blockUnblockQuiz = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/blockUnblockQuiz",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.blockUnblockQuiz(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "block or unblock a quiz",
        tags: ["api", "admin", "quiz"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                quizId: Joi.string().required(),
                isActive: Joi.boolean().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var createQuestion = {
    method: "POST",
    path: "/api/admin/program/{programId}/module/{moduleId}/quiz/{quizId}/createQuestion",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId;
        payloadData.quizId = request.params.quizId;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.createQuestion(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "add question to quiz of module",
        tags: ["api", "admin", "question"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required(),
                quizId: Joi.string().required()
            },
            payload: {
                question: Joi.string().required(),
                questionType: Joi.string().required().valid([Config.APP_CONSTANTS.DATABASE.QUIZ_TYPE.MULTIPLE_CHOICE,Config.APP_CONSTANTS.DATABASE.QUIZ_TYPE.SINGLE_CHOICE]),
                options: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.number().required().min(1),
                        option: Joi.string().required(),
                        answerType: Joi.string().required().valid([Config.APP_CONSTANTS.DATABASE.ANSWER_TYPE.CHECKBOX,Config.APP_CONSTANTS.DATABASE.ANSWER_TYPE.IMAGE]),
                        feedback: Joi.string().required()
                    })
                ).required(),
                answerId: Joi.array().items(Joi.number()).required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var getQuestion = {
    method: "GET",
    path: "/api/admin/program/{programId}/module/{moduleId}/quiz/{quizId}",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.params;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.getQuestion(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "get questions to quiz of module",
        tags: ["api", "admin", "question"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required(),
                quizId: Joi.string().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var blockUnblockQuestion = {
    method: "PUT",
    path: "/api/admin/program/{programId}/module/{moduleId}/quiz/{quizId}/blockUnblockQuiz",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        payloadData.programId = request.params.programId;
        payloadData.moduleId = request.params.moduleId;
        payloadData.quizId = request.params.quizId;
        return new Promise((resolve, reject) => {
            Controller.AdminProgramController.blockUnblockQuestion(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    config: {
        description: "block or unblock a quiz",
        tags: ["api", "admin", "quiz"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required(),
                quizId: Joi.string().required()
            },
            payload: {
                questionId: Joi.string().required(),
                isActive: Joi.boolean().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

var AdminProgramRoute = [
    createProgram,
    getPrograms,
    blockUnblockProgram,
    updateProgram,
    createModule,
    getModules,
    blockUnblockModule,
    getSpecificModule,
    updateModule,
    updateModuleContent,
    createTimeTable,
    getTimeTable,
    blockUnblockTimeTable,
    updateTimeTable,
    createActivities,
    getActivities,
    getSpecificActivities,
    blockUnblockActivity,
    updateActivity,
    updateActivityContent,
    createGoals,
    getGoals,
    blockUnblockGoals,
    updateGoals,
    createQuiz,
    getQuiz,
    blockUnblockQuiz,
    createQuestion,
    getQuestion,
    blockUnblockQuestion
];
module.exports = AdminProgramRoute;