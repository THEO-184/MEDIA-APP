"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const errors_1 = require("../errors");
const checkPermission = (user, resourceId) => {
    if (user._id === resourceId.toString())
        return;
    else
        throw new errors_1.Unauthorized("user not authorized");
};
exports.checkPermission = checkPermission;
