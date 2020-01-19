/**
 * Created by Navit
 */

"use strict";
var SOCIAL = {
  FACEBOOK: "FACEBOOK"
};
var swaggerDefaultResponseMessages = [
  { code: 200, message: "OK" },
  { code: 400, message: "Bad Request" },
  { code: 401, message: "Unauthorized" },
  { code: 404, message: "Data Not Found" },
  { code: 500, message: "Internal Server Error" }
];
var DATABASE = {
  DEVICE_TYPES: {
    ANDROID: "ANDROID",
    IOS: "IOS"
  },
  USER_ROLES: {
    USER: "USER",
    SUPERADMIN: "SUPERADMIN",
    ADMIN: "ADMIN"
  },
  CONTENT_TYPES: {
    HTML: "HTML",
    TEXT: "TEXT",
    IMAGE: "IMAGE",
    VIDEO: "VIDEO",
    CAROUSEL: "CAROUSEL"
  },
  QUIZ_TYPE: {
    SINGLE_CHOICE: "SINGLE_CHOICE",
    MULTIPLE_CHOICE: "MULTIPLE_CHOICE"
  },
  ANSWER_TYPE: {
    CHECKBOX: "CHECKBOX",
    IMAGE: "IMAGE"
  },
  MODULE_STATUS: {
    LOCKED: "LOCKED",
    UNLOCKED: "UNLOCKED",
    ACTIVE: "ACTIVE",
    COMPLETE: "COMPLETE"
  },
  USER_ENROL_STATE: {
    PROGRAM_NOT_ENROLLED: "PROGRAM_NOT_ENROLLED",
    MODULE_NOT_ENROLLED: "MODULE_NOT_ENROLLED",
    USER_ENROLLED: "USER_ENROLLED"
  },
  TRACKERS : {
    T_VISIT_URL: 'T_VISIT_URL',
    T_LOGIN: 'T_LOGIN',
    T_LOGOUT: 'T_LOGOUT',
    T_IMAGE_CLICK: 'T_IMAGE_CLICK',
    T_VIDEO_CLICK: 'T_VIDEO_CLICK'
  },
  SESSION_STATUS : {
    ACTIVE: "ACTIVE",
    FINISHED: "FINISHED"
  }
};

var STATUS_MSG = {
  ERROR: {
    DEFAULT: {
      statusCode: 400,
      customMessage: "Error",
      type: "DEFAULT"
    },
    APP_ERROR: {
      statusCode: 400,
      customMessage: 'Application error',
      type: 'APP_ERROR'
    },
    DB_ERROR: {
      statusCode: 400,
      customMessage: 'DB Error : ',
      type: 'DB_ERROR'
    },
    INVALID_ID: {
      statusCode: 400,
      customMessage: 'Invalid id provided : ',
      type: 'INVALID_ID'
    },
    DUPLICATE: {
      statusCode: 400,
      customMessage: 'Duplicate entry',
      type: 'DUPLICATE'
    },
    USER_ALREADY_REGISTERED: {
      statusCode: 409,
      customMessage: "You are already registered with us",
      type: "USER_ALREADY_REGISTERED"
    },
    FACEBOOK_ID_PASSWORD_ERROR: {
      statusCode: 400,
      customMessage:
        "Only one field should be filled at a time, either facebookId or password",
      type: "FACEBOOK_ID_PASSWORD_ERROR"
    },
    PASSWORD_REQUIRED: {
      statusCode: 400,
      customMessage: "Password is required",
      type: "PASSWORD_REQUIRED"
    },
    INVALID_COUNTRY_CODE: {
      statusCode: 400,
      customMessage: "Invalid Country Code, Should be in the format +52",
      type: "INVALID_COUNTRY_CODE"
    },
    INVALID_PHONE_NO_FORMAT: {
      statusCode: 400,
      customMessage: "Phone no. cannot start with 0",
      type: "INVALID_PHONE_NO_FORMAT"
    },
    IMP_ERROR: {
      statusCode: 500,
      customMessage: "Implementation Error",
      type: "IMP_ERROR"
    },
    UNIQUE_CODE_LIMIT_REACHED: {
      statusCode: 400,
      customMessage: "Cannot Generate Unique Code, All combinations are used",
      type: "UNIQUE_CODE_LIMIT_REACHED"
    },
    PHONE_NO_EXIST: {
      statusCode: 400,
      customMessage: "Mobile No. Already Exist",
      type: "PHONE_NO_EXIST"
    },
    EMAIL_NO_EXIST: {
      statusCode: 400,
      customMessage: "Email Address Already Exist",
      type: "EMAIL_NO_EXIST"
    },
    USERNAME_EXIST: {
      statusCode: 400,
      customMessage: "User Already Exist",
      type: "USERNAME_EXIST"
    },
    INVALID_TOKEN: {
      statusCode: 401,
      customMessage: "Invalid token provided",
      type: "INVALID_TOKEN"
    },
    INCORRECT_ACCESSTOKEN: {
      statusCode: 403,
      customMessage: "Incorrect AccessToken",
      type: "INCORRECT_ACCESSTOKEN"
    },
    INVALID_CODE: {
      statusCode: 400,
      customMessage: "Invalid Verification Code",
      type: "INVALID_CODE"
    },
    USER_NOT_FOUND: {
      statusCode: 400,
      customMessage: "User Not Found",
      type: "USER_NOT_FOUND"
    },
    PROGRAM_NOT_FOUND: {
      statusCode: 400,
      customMessage: "Program Not Found",
      type: "PROGRAM_NOT_FOUND"
    },
    MODULE_NOT_FOUND: {
      statusCode: 400,
      customMessage: "Module Not Found",
      type: "MODULE_NOT_FOUND"
    },
    TIMETABLE_NOT_FOUND: {
      statusCode: 400,
      customMessage: "Time table Not Found",
      type: "TIMETABLE_NOT_FOUND"
    },
    GOAL_NOT_FOUND: {
      statusCode: 400,
      customMessage: "Goal Not Found",
      type: "GOAL_NOT_FOUND"
    },
    QUIZ_NOT_FOUND: {
      statusCode: 400,
      customMessage: "Quiz Not Found",
      type: "QUIZ_NOT_FOUND"
    },
    QUESTION_NOT_FOUND: {
      statusCode: 400,
      customMessage: "Question Not Found",
      type: "QUESTION_NOT_FOUND"
    },
    ACTIVITY_NOT_FOUND: {
      statusCode: 400,
      customMessage: "Activity Not Found",
      type: "ACTIVITY_NOT_FOUND"
    },
    PROGRAM_MODULE_MISMATCH: {
      statusCode: 400,
      customMessage: "Module does not belong to this program",
      type: "PROGRAM_MODULE_MISMATCH"
    },
    MODULE_TIMETABLE_MISMATCH: {
      statusCode: 400,
      customMessage: "Time Table does not belong to this module",
      type: "MODULE_TIMETABLE_MISMATCH"
    },
    MODULE_ACTIVITY_MISMATCH: {
      statusCode: 400,
      customMessage: "Activity does not belong to this module",
      type: "MODULE_ACTIVITY_MISMATCH"
    },
    MODULE_GOAL_MISMATCH: {
      statusCode: 400,
      customMessage: "Goal does not belong to this module",
      type: "MODULE_GOAL_MISMATCH"
    },
    MODULE_QUIZ_MISMATCH: {
      statusCode: 400,
      customMessage: "Quiz does not belong to this module",
      type: "MODULE_QUIZ_MISMATCH"
    },
    QUIZ_SUBMISSION_MISMATCH: {
      statusCode: 400,
      customMessage: "Submission for this quiz dont match the number of question in the quiz.",
      type: "QUIZ_SUBMISSION_MISMATCH"
    },
    PROGRAM_BLOCKED: {
      statusCode: 400,
      customMessage: "Program you are trying to access is blocked",
      type: "PROGRAM_BLOCKED"
    },
    MODULE_BLOCKED: {
      statusCode: 400,
      customMessage: "Module you are trying to access is blocked",
      type: "MODULE_BLOCKED"
    },
    QUIZ_BLOCKED: {
      statusCode: 400,
      customMessage: "Quiz you are trying to access is blocked",
      type: "QUIZ_BLOCKED"
    },
    INCORRECT_PASSWORD: {
      statusCode: 400,
      customMessage: "Incorrect Password",
      type: "INCORRECT_PASSWORD"
    },
    ACCOUNT_BLOCKED: {
      statusCode: 400,
      customMessage: "You account has been blocked by authorities. Please Contact them.",
      type: "ACCOUNT_BLOCKED"
    },
    PRIVILEGE_MISMATCH: {
      statusCode: 400,
      customMessage: "Your account doesnt have this privileges",
      type: "PRIVILEGE_MISMATCH"
    },
    NOT_REGISTERED: {
      statusCode: 400,
      customMessage:
        "You are not registered with Us. Kindly register yourself to avail services!",
      type: "NOT_REGISTERED"
    },
    FACEBOOK_ID_NOT_FOUND: {
      statusCode: 400,
      customMessage: "Facebook Id Not Found",
      type: "FACEBOOK_ID_NOT_FOUND"
    },
    PHONE_VERIFICATION_COMPLETE: {
      statusCode: 400,
      customMessage: "Your mobile number verification is already completed.",
      type: "PHONE_VERIFICATION_COMPLETE"
    },
    EMAIL_VERIFICATION_COMPLETE: {
      statusCode: 400,
      customMessage: "Your email address verification is already completed.",
      type: "EMAIL_VERIFICATION_COMPLETE"
    },
    OTP_CODE_NOT_FOUND: {
      statusCode: 400,
      customMessage: "Otp code not found for this user",
      type: "OTP_CODE_NOT_FOUND"
    },
    NOT_FOUND: {
      statusCode: 400,
      customMessage: "User Not Found",
      type: "NOT_FOUND"
    },
    WRONG_PASSWORD: {
      statusCode: 400,
      customMessage: "Invalid old password",
      type: "WRONG_PASSWORD"
    },
    NOT_UPDATE: {
      statusCode: 409,
      customMessage: "New password must be different from old password",
      type: "NOT_UPDATE"
    },
    PASSWORD_CHANGE_REQUEST_INVALID: {
      statusCode: 400,
      type: "PASSWORD_CHANGE_REQUEST_INVALID",
      customMessage: "Invalid password change request."
    },
    USER_NOT_REGISTERED: {
      statusCode: 401,
      customMessage: "User is not registered with us",
      type: "USER_NOT_REGISTERED"
    },
    PHONE_VERIFICATION: {
      statusCode: 400,
      customMessage: "Your mobile number verification is incomplete.",
      type: " PHONE_VERIFICATION"
    },
    INCORRECT_ID: {
      statusCode: 401,
      customMessage: "Incorrect Phone Number",
      type: "INCORRECT_ID"
    },
    NOT_VERFIFIED: {
      statusCode: 401,
      customMessage: "User Not Verified",
      type: "NOT_VERFIFIED"
    },
    PASSWORD_CHANGE_REQUEST_EXPIRE: {
      statusCode: 400,
      customMessage: " Password change request time expired",
      type: "PASSWORD_CHANGE_REQUEST_EXPIRE"
    },
    INVALID_EMAIL_FORMAT: {
      statusCode: 400,
      customMessage: "Inavlid email format",
      type: "INVALID_EMAIL_FORMAT"
    },
    ALREADY_PROGRAM_ENROLL: {
      statusCode: 400,
      customMessage: "You are already enrolled in this program",
      type: "ALREADY_PROGRAM_ENROLL"
    },
    PROGRAM_NOT_ENROLL: {
      statusCode: 400,
      customMessage: "You are not enrolled in this program",
      type: "PROGRAM_NOT_ENROLL"
    },
    INCOMPLETE_PROGRAM: {
      statusCode: 400,
      customMessage: "You cannot enrol to this program as you have a previous incomplete program",
      type: "INCOMPLETE_PROGRAM"
    },
    PROGRAM_COMPLETE: {
      statusCode: 400,
      customMessage: "The program is already complete",
      type: "PROGRAM_COMPLETE"
    },
    ALREADY_MODULE_ENROLL: {
      statusCode: 400,
      customMessage: "You are already enrolled in this module for this program",
      type: "ALREADY_MODULE_ENROLL"
    },
    MODULE_NOT_ENROLL: {
      statusCode: 400,
      customMessage: "You are not enrolled in this module of the program",
      type: "MODULE_NOT_ENROLL"
    },
    INCOMPLETE_MODULE: {
      statusCode: 400,
      customMessage: "You cannot enrol to this module as you have a previous incomplete module",
      type: "INCOMPLETE_MODULE"
    },
    MODULE_COMPLETE: {
      statusCode: 400,
      customMessage: "The module is already complete",
      type: "MODULE_COMPLETE"
    },
    ACTIVITY_COMPLETE: {
      statusCode: 400,
      customMessage: "The activty is already complete for this module",
      type: "ACTIVITY_COMPLETE"
    },
    GOAL_ALREADY_COMPLETED: {
      statusCode: 400,
      customMessage: "The goal is already completed for this module",
      type: "GOAL_ALREADY_COMPLETED"
    },
    TIMETABLE_ALREADY_EXIST_USER: {
      statusCode: 400,
      customMessage: "This time table already exist in your list",
      type: "TIMETABLE_ALREADY_EXIST_USER"
    },
    MULTIPLE_GOAL_UPDATE: {
      statusCode: 400,
      customMessage: "You can only update goal once for one module",
      type: "MULTIPLE_GOAL_UPDATE"
    },
    ALREADY_GOAL_SET: {
      statusCode: 400,
      customMessage: "You have already set the same goal for module",
      type: "ALREADY_GOAL_SET"
    },
    GOAL_NOT_SETTED: {
      statusCode: 400,
      customMessage: "You have not setted up any goal for this module",
      type: "GOAL_NOT_SETTED"
    },
    GOAL_MISMATCH: {
      statusCode: 400,
      customMessage: "You are trying to complete the goal that you have not setted up for this module",
      type: "GOAL_MISMATCH"
    },
    ALREADY_FAVOURITE_MODULE: {
      statusCode: 400,
      customMessage: "The Module you are trying to favourite is already favourite module.",
      type: "ALREADY_FAVOURITE_MODULE"
    },
    SESSION_INACTIVE: {
      statusCode: 400,
      customMessage: "The Session you are trying to use is inactive",
      type: "SESSION_INACTIVE"
    }
  },
  SUCCESS: {
    DEFAULT: {
      statusCode: 200,
      customMessage: "Success",
      type: "DEFAULT"
    },
    CREATED: {
      statusCode: 201,
      customMessage: "Created Successfully",
      type: "CREATED"
    },
    VERIFY_COMPLETE: {
      statusCode: 200,
      customMessage: "OTP verification is completed.",
      type: "VERIFY_SENT"
    },
    VERIFY_SENT: {
      statusCode: 200,
      customMessage: "Your new OTP has been sent to your phone",
      type: "VERIFY_SENT"
    },
    LOGOUT: {
      statusCode: 200,
      customMessage: "Logged Out Successfully",
      type: "LOGOUT"
    },
    PASSWORD_RESET: {
      statusCode: 200,
      customMessage: "Password Reset Successfully",
      type: "PASSWORD_RESET"
    }
  }
};

var notificationMessages = {};

var TIME_UNITS = {
  MONTHS: "months",
  HOURS: "hours",
  MINUTES: "minutes",
  SECONDS: "seconds",
  WEEKS: "weeks",
  DAYS: "days"
};

const CUSTOM_ERROR_404 = function (msg) {
  return {
    statusCode: 404,
    customMessage: msg + " NOT FOUND",
    type: "PAGE_NOT_FOUND"
  };
};

const CUSTOM_ERROR = function (msg, statusCode) {
  return {
    statusCode: statusCode || 400,
    customMessage: msg
  };
};

var APP_CONSTANTS = {
  SOCIAL: SOCIAL,
  TIME_UNITS: TIME_UNITS,
  DATABASE: DATABASE,
  swaggerDefaultResponseMessages: swaggerDefaultResponseMessages,
  STATUS_MSG: STATUS_MSG,
  notificationMessages: notificationMessages,
  CUSTOM_ERROR_404: CUSTOM_ERROR_404,
  CUSTOM_ERROR: CUSTOM_ERROR
};

module.exports = APP_CONSTANTS;
