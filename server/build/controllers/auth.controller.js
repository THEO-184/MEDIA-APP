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
exports.signOut = exports.signIn = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestErr("provide email and password");
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.Unauthenticated("user not authenticated");
    }
    const isPasswordMatch = yield user.comparePassword(password);
    if (!isPasswordMatch) {
        throw new errors_1.Unauthenticated("user not authenticated");
    }
    (0, jwt_1.attachCookies)(res, { _id: user._id, name: user.name });
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ user: { _id: user._id, name: user.name, email: user.email } });
});
exports.signIn = signIn;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("accessToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "logout successful" });
});
exports.signOut = signOut;
