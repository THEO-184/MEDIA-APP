"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPeopleToFollow = exports.removeFollower = exports.removeFollowing = exports.addFollower = exports.addFollowing = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getCurrentUser = exports.getAllUsers = exports.createUser = void 0;
const cloudinary = require("cloudinary").v2;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const user_model_1 = __importDefault(require("../models/user.model"));
const user_services_1 = require("../services/user.services");
const permissions_1 = require("../utils/permissions");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_services_1.createUserService)(req.body);
    const { name, email, _id, createdAt } = user;
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ status: true, user: { name, email, _id, createdAt } });
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find().select("-password -__v").sort("createdAt");
    res.status(http_status_codes_1.StatusCodes.OK).json({ count: users.length, users });
});
exports.getAllUsers = getAllUsers;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const user = yield user_model_1.default.findOne({ _id })
        .select("-password -__v")
        .populate("following", "_id name photo")
        .populate("followers", "_id name photo");
    if (!user) {
        throw new errors_1.NotFound("no user found");
    }
    (0, permissions_1.checkPermission)(req.user, user._id);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        user,
    });
});
exports.getCurrentUser = getCurrentUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_services_1.findUserService)({ _id: req.params.id });
    if (!user) {
        throw new errors_1.NotFound(`no user with id : ${req.params.id} was found`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        user,
    });
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.default.findOne({ _id: req.params.id });
    const { email, name, password } = req.body;
    if (!email || !password || !name) {
        throw new errors_1.BadRequestErr("provide details to be updated");
    }
    if (!user) {
        throw new errors_1.NotFound(`no user with id : ${req.params.id} was found`);
    }
    if (req.files) {
        const userProfile = req.files.image;
        // check file type
        if (!userProfile.mimetype.startsWith("image")) {
            throw new errors_1.BadRequestErr("file type should be image");
        }
        // check file size
        const maxSize = 1024 * 1024; // extract data fom form
        // if (maxSize > userProfile.size) {
        // 	throw new BadRequestErr("image size should be atmost 1kb");
        // }
        const imgFile = yield cloudinary.uploader.upload(userProfile.tempFilePath, {
            use_filename: true,
            folder: "MERN-SOCIAL/Profile-photos",
        });
        user.photo = imgFile.secure_url;
    }
    (0, permissions_1.checkPermission)(req.user, user._id);
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.about = req.body.about;
    yield user.save();
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .send({ msg: `user with id:${req.params.id} succesfully updated` });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.default.findOne({ _id: req.params.id });
    if (!user) {
        throw new errors_1.NotFound(`no user with id : ${req.params.id} was found`);
    }
    (0, permissions_1.checkPermission)(req.user, user._id);
    yield user.remove();
    res.status(http_status_codes_1.StatusCodes.OK).send({ msg: "delete sucessfull" });
});
exports.deleteUser = deleteUser;
const addFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.findOneAndUpdate({ _id: req.user._id }, { $push: { following: req.body.id } });
    next();
});
exports.addFollowing = addFollowing;
const addFollower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOneAndUpdate({ _id: req.body.id }, { $push: { followers: req.user._id } }, { new: true, runValidators: true })
        .select("-password -__v")
        .populate("followers", "_id name photo")
        .populate("following", "_id name photo");
    if (!user) {
        throw new errors_1.NotFound(`no user forund with id: ${req.body.id}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: true, user });
});
exports.addFollower = addFollower;
const removeFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.findOneAndUpdate({ _id: req.user._id }, { $pull: { following: req.body.id } });
    next();
});
exports.removeFollowing = removeFollowing;
const removeFollower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOneAndUpdate({ _id: req.body.id }, { $pull: { followers: req.user._id } }, { new: true, runValidators: true })
        .select("-password -__v")
        .populate("followers", "_id name photo")
        .populate("following", "_id name photo");
    if (!user) {
        throw new errors_1.NotFound(`no user forund with id: ${req.body.id}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: true, user });
});
exports.removeFollower = removeFollower;
const findPeopleToFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ _id: req.user._id });
    if (!user) {
        throw new errors_1.NotFound(`no user found with id : ${req.user._id}`);
    }
    let following = user.following;
    following.push(req.user._id);
    const usersToFollow = yield user_model_1.default.find({ _id: { $nin: following } }).select("name photo");
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ count: usersToFollow.length, users: usersToFollow });
});
exports.findPeopleToFollow = findPeopleToFollow;
