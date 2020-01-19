/**
 * Created by Navit
 */
"use strict";

var DemoBaseRoute = require("./demoRoute/demoBaseRoute");
var UserBaseRoute = require("./userRoute/userBaseRoute");
var AdminBaseRoute = require("./adminRoute/adminBaseRoute");
var AdminProgramRoute = require("./adminRoute/adminProgramRoute");
var UserProgramRoute = require("./userRoute/userProgramRoute");
var UploadBaseRoute = require("./uploadRoute/uploadBaseRoute");
var APIs = [].concat(UserBaseRoute, AdminBaseRoute, AdminProgramRoute, UserProgramRoute, UploadBaseRoute);
module.exports = APIs;
