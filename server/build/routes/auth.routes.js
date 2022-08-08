"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.route("/signin").post(auth_controller_1.signIn);
router.route("/signout").get(auth_controller_1.signOut);
exports.default = router;
