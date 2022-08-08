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
exports.commentOnPost = exports.unLikePost = exports.likePost = exports.deletePost = exports.createPost = exports.postsByUser = exports.listNewsFeed = void 0;
const cloudinary = require("cloudinary").v2;
const fs_1 = __importDefault(require("fs"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const post_model_1 = __importDefault(require("../models/post.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const permissions_1 = require("../utils/permissions");
const listNewsFeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ _id: req.user._id });
    if (!user) {
        throw new errors_1.NotFound(`no user with id: ${req.user._id}`);
    }
    let following = user === null || user === void 0 ? void 0 : user.following;
    following.push(req.user._id);
    const posts = yield post_model_1.default.find({ postedBy: { $in: following } })
        .populate("postedBy", "name")
        .populate("likes", "name")
        .populate("comments.postedBy", "name");
    res.status(http_status_codes_1.StatusCodes.OK).json({ count: posts.length, posts });
});
exports.listNewsFeed = listNewsFeed;
const postsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userPost = yield post_model_1.default.find({ postedBy: req.params.id })
        .populate("postedBy", "name")
        .populate("likes", "name")
        .populate("comments.postedBy", "name");
    if (!userPost) {
        throw new errors_1.NotFound(`no user found with id: ${req.params.id}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ count: userPost.length, posts: userPost });
});
exports.postsByUser = postsByUser;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.postedBy = req.user._id;
    let photo = "";
    if (req.files) {
        const postImage = req.files.image;
        // check file type
        if (!postImage.mimetype.startsWith("image")) {
            throw new errors_1.BadRequestErr("please upload an image file");
        }
        const imgFile = yield cloudinary.uploader.upload(postImage.tempFilePath, {
            use_filename: true,
            folder: "MERN-SOCIAL/posts-photos",
        });
        photo = imgFile.secure_url;
        fs_1.default.unlinkSync(postImage.tempFilePath);
        req.body.photo = photo;
    }
    const post = yield post_model_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, post });
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.default.findOne({ _id: req.params.postId });
    if (!post) {
        throw new errors_1.NotFound(`no post found with id: ${req.params.postId}`);
    }
    (0, permissions_1.checkPermission)(req.user, post.postedBy);
    yield post_model_1.default.remove();
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "post successfully deleted" });
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.default.findOneAndUpdate({ _id: req.body.id }, { $addToSet: { likes: req.user._id } }, { new: true, runValidators: true })
        .populate("postedBy", "name")
        .populate("likes", "name")
        .populate("comments.postedBy", "name");
    if (!post) {
        throw new errors_1.NotFound(`no post found with id: ${req.body.id}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ post });
});
exports.likePost = likePost;
const unLikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.default.findOneAndUpdate({ _id: req.body.id }, { $pull: { likes: req.user._id } }, { new: true, runValidators: true })
        .populate("postedBy", "name")
        .populate("likes", "name")
        .populate("comments.postedBy", "name");
    if (!post) {
        throw new errors_1.NotFound(`no post found with id: ${req.body.id}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ post });
});
exports.unLikePost = unLikePost;
const commentOnPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let comment = req.body.comment;
    comment.postedBy = req.user._id;
    const post = yield post_model_1.default.findOneAndUpdate({ _id: req.body.id }, { $push: { comments: comment } }, { new: true, runValidators: true })
        .populate("postedBy", "name")
        .populate("likes", "name")
        .populate("comments.postedBy", "name");
    if (!post) {
        throw new errors_1.NotFound(`no post found with id: ${req.body.id}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ post });
});
exports.commentOnPost = commentOnPost;
