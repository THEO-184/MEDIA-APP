"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookies = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (payload) => {
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(payload, secret);
    return token;
};
exports.createJWT = createJWT;
const attachCookies = (res, payload) => {
    const accessToken = (0, exports.createJWT)(payload);
    const tenHours = 1000 * 60 * 60 * 10;
    res.cookie("accessToken", accessToken, {
        signed: true,
        expires: new Date(Date.now() + tenHours),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
};
exports.attachCookies = attachCookies;
