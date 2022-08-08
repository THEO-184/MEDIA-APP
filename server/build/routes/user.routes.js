"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./../controllers/user.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.route("/").get(user_controller_1.getAllUsers).post(user_controller_1.createUser);
router.route("/showMe").get(authMiddleware_1.authMiddleware, user_controller_1.getCurrentUser);
router.route("/follow").put(authMiddleware_1.authMiddleware, user_controller_1.addFollowing, user_controller_1.addFollower);
router.route("/unfollow").put(authMiddleware_1.authMiddleware, user_controller_1.removeFollowing, user_controller_1.removeFollower);
router.route("/findpeople").get(authMiddleware_1.authMiddleware, user_controller_1.findPeopleToFollow);
router
    .route("/:id")
    .get(authMiddleware_1.authMiddleware, user_controller_1.getUserById)
    .put(authMiddleware_1.authMiddleware, user_controller_1.updateUser)
    .delete(authMiddleware_1.authMiddleware, user_controller_1.deleteUser);
exports.default = router;
