/**
 * Created by Navit on 15/11/16.
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

var getPrograms = {
    method: "GET",
    path: "/api/program",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            Controller.UserProgramController.getPrograms(userData, function (err, data) {
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
        tags: ["api", "program"],
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

var getModules = {
    method: "GET",
    path: "/api/program/{programId}",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            var payloadData = request.params
            Controller.UserProgramController.getModules(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get all modules of a programs",
        tags: ["api", "program", "module"],
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
};

var getSpecificModule = {
    method: "GET",
    path: "/api/program/{programId}/module/{moduleId}",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            var payloadData = request.params
            Controller.UserProgramController.getSpecificModule(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get specific module of a programs",
        tags: ["api", "program", "module"],
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
};

var getModuleTimeTable = {
    method: "GET",
    path: "/api/program/{programId}/module/{moduleId}/timeTable",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            var payloadData = request.params
            Controller.UserProgramController.getModuleTimeTable(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get timetable of a module of a program",
        tags: ["api", "program", "module", "timetable"],
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
};

var getModuleActivities = {
    method: "GET",
    path: "/api/program/{programId}/module/{moduleId}/activity",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            var payloadData = request.params
            Controller.UserProgramController.getModuleActivities(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get activities of a module of a program",
        tags: ["api", "program", "module", "activity"],
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
};

var getModuleActivityContent = {
    method: "GET",
    path: "/api/program/{programId}/module/{moduleId}/activity/{activityId}",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            var payloadData = request.params
            Controller.UserProgramController.getModuleActivityContent(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get activities content of a module of a program",
        tags: ["api", "program", "module", "activty"],
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
};

var getModuleGoals = {
    method: "GET",
    path: "/api/program/{programId}/module/{moduleId}/goals",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            var payloadData = request.params
            Controller.UserProgramController.getModuleGoals(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get goals of a module of a program",
        tags: ["api", "program", "module", "goals"],
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
};

var getModuleQuiz = {
    method: "GET",
    path: "/api/program/{programId}/module/{moduleId}/quiz",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            var payloadData = request.params
            Controller.UserProgramController.getModuleQuiz(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get quizes of a module of a program",
        tags: ["api", "program", "module", "quiz"],
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
};

var getModuleQuizQuestion = {
    method: "GET",
    path: "/api/program/{programId}/module/{moduleId}/quiz/{quizId}",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            var payloadData = request.params
            Controller.UserProgramController.getModuleQuizQuestion(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "get questions of a quizes of a module of a program",
        tags: ["api", "program", "module", "quiz"],
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
};

var enrolToProgram = {
    method: "POST",
    path: "/api/program/enrol",
    handler: function (request, h) {
        return new Promise((resolve, reject) => {
            var userData =
                (request.auth &&
                    request.auth.credentials &&
                    request.auth.credentials.userData) ||
                null;
            var payloadData = request.payload
            Controller.UserProgramController.enrolToProgram(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "enrol into a program",
        tags: ["api", "program"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: {
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
};

var enrolToModule = {
    method: "POST",
    path: "/api/program/{programId}/module/enrol",
    handler: function (request, h) {
        return new Promise((resolve, reject) => {
            var userData =
                (request.auth &&
                    request.auth.credentials &&
                    request.auth.credentials.userData) ||
                null;
            var payloadData = request.payload;
            payloadData.programId = request.params.programId
            Controller.UserProgramController.enrolToModule(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "enrol into a module of a program",
        tags: ["api", "program", "module"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required()
            },
            payload: {
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
};

var addToTimeTable = {
    method: "POST",
    path: "/api/program/{programId}/module/{moduleId}/addToTimeTable",
    handler: function (request, h) {
        return new Promise((resolve, reject) => {
            var userData =
                (request.auth &&
                    request.auth.credentials &&
                    request.auth.credentials.userData) ||
                null;
            var payloadData = request.payload;
            payloadData.programId = request.params.programId
            payloadData.moduleId = request.params.moduleId
            Controller.UserProgramController.addToTimeTable(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "add timetable to user module",
        tags: ["api", "program", "module", "timetable"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                timeTableId: Joi.array().items(Joi.number()).required()
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

var completeAnActivity = {
    method: "POST",
    path: "/api/program/{programId}/module/{moduleId}/completeAnActivity",
    handler: function (request, h) {
        return new Promise((resolve, reject) => {
            var userData =
                (request.auth &&
                    request.auth.credentials &&
                    request.auth.credentials.userData) ||
                null;
            var payloadData = request.payload;
            payloadData.programId = request.params.programId
            payloadData.moduleId = request.params.moduleId
            Controller.UserProgramController.completeAnActivity(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "add activity to user module",
        tags: ["api", "program", "module", "activity"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                activityId: Joi.number().required()
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

var addToGoal = {
    method: "POST",
    path: "/api/program/{programId}/module/{moduleId}/addToGoal",
    handler: function (request, h) {
        return new Promise((resolve, reject) => {
            var userData =
                (request.auth &&
                    request.auth.credentials &&
                    request.auth.credentials.userData) ||
                null;
            var payloadData = request.payload;
            payloadData.programId = request.params.programId
            payloadData.moduleId = request.params.moduleId
            Controller.UserProgramController.addToGoal(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "add goal to user module",
        tags: ["api", "program", "module", "goal"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                goalId: Joi.number().required()
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

var completeGoal = {
    method: "POST",
    path: "/api/program/{programId}/module/{moduleId}/completeGoal",
    handler: function (request, h) {
        return new Promise((resolve, reject) => {
            var userData =
                (request.auth &&
                    request.auth.credentials &&
                    request.auth.credentials.userData) ||
                null;
            var payloadData = request.payload;
            payloadData.programId = request.params.programId
            payloadData.moduleId = request.params.moduleId
            Controller.UserProgramController.completeGoal(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "complete goal to user module",
        tags: ["api", "program", "module", "goal"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                goalId: Joi.number().required()
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

var submitQuiz = {
    method: "POST",
    path: "/api/program/{programId}/module/{moduleId}/submitQuiz",
    handler: function (request, h) {
        return new Promise((resolve, reject) => {
            var userData =
                (request.auth &&
                    request.auth.credentials &&
                    request.auth.credentials.userData) ||
                null;
            var payloadData = request.payload;
            payloadData.programId = request.params.programId
            payloadData.moduleId = request.params.moduleId
            Controller.UserProgramController.submitQuiz(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "submit a quiz to user module",
        tags: ["api", "program", "module", "quiz"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            params: {
                programId: Joi.string().required(),
                moduleId: Joi.string().required()
            },
            payload: {
                quizId: Joi.number().required(),
                submission: Joi.array().items(
                    Joi.object().keys({
                        questionId: Joi.number().required(),
                        answerId: Joi.array().items(Joi.number()).required()
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
};

var completeModule = {
    method: "POST",
    path: "/api/program/{programId}/module/{moduleId}/completeModule",
    handler: function (request, h) {
        return new Promise((resolve, reject) => {
            var userData =
                (request.auth &&
                    request.auth.credentials &&
                    request.auth.credentials.userData) ||
                null;
            var payloadData = request.params;
            Controller.UserProgramController.completeModule(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "complete a user module",
        tags: ["api", "program", "module"],
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
};

var favouriteModule = {
    method: "POST",
    path: "/api/program/{programId}/module/{moduleId}/favouriteModule",
    handler: function (request, h) {
        return new Promise((resolve, reject) => {
            var userData =
                (request.auth &&
                    request.auth.credentials &&
                    request.auth.credentials.userData) ||
                null;
            var payloadData = request.params;
            Controller.UserProgramController.favouriteModule(userData, payloadData, function (err, data) {
                if (!err) {
                    resolve(UniversalFunctions.sendSuccess(null, data));
                } else {
                    reject(UniversalFunctions.sendError(err));
                }
            });
        });
    },
    config: {
        description: "favourite a user module",
        tags: ["api", "program", "module"],
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
};

var sendTrackingData = {
    method: "POST",
    path: "/api/program/sendTrackingData",
    handler: function (request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
      return new Promise((resolve, reject) => {
        Controller.UserProgramController.sendTrackingData(
          userData,
          request.payload,
          function (err, data) {
            if (!err) {
              resolve(
                UniversalFunctions.sendSuccess(
                  UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS
                    .success,
                  data
                )
              );
            } else {
              reject(UniversalFunctions.sendError(err));
            }
          }
        );
      });
    },
    config: {
      description: "send Tracking Data",
      tags: ["api", "program", "tracking"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        payload: {
          sessionId: Joi.string().required(),
          programId: Joi.number().required(),
          moduleId: Joi.number().required(),
          trackingType: Joi.string().required().valid([
            Config.APP_CONSTANTS.DATABASE.TRACKERS.T_IMAGE_CLICK,
            Config.APP_CONSTANTS.DATABASE.TRACKERS.T_LOGIN,
            Config.APP_CONSTANTS.DATABASE.TRACKERS.T_LOGOUT,
            Config.APP_CONSTANTS.DATABASE.TRACKERS.T_VIDEO_CLICK,
            Config.APP_CONSTANTS.DATABASE.TRACKERS.T_VISIT_URL
          ]),
          linkToTrack: Joi.string().optional().allow(""),
          misc: Joi.array().items(
            Joi.object().keys({
              key: Joi.string().optional(),
              value: Joi.string().optional()
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


var UserProgramRoute = [
    getPrograms,
    getModules,
    getSpecificModule,
    getModuleTimeTable,
    getModuleActivities,
    getModuleActivityContent,
    getModuleGoals,
    getModuleQuiz,
    getModuleQuizQuestion,
    enrolToProgram,
    enrolToModule,
    addToTimeTable,
    completeAnActivity,
    addToGoal,
    completeGoal,
    submitQuiz,
    completeModule,
    favouriteModule,
    sendTrackingData
];
module.exports = UserProgramRoute;