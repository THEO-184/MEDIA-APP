"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserService = exports.createUserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUserService = (input) => {
    return user_model_1.default.create(input);
};
exports.createUserService = createUserService;
const findUserService = (filter) => {
    return user_model_1.default.findOne(filter)
        .select("-password -__v")
        .populate("following", "name _id photo")
        .populate("followers", "name _id photo");
};
exports.findUserService = findUserService;
