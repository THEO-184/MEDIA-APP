"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.Unauthenticated = exports.Unauthorized = exports.BadRequestErr = exports.NotFound = void 0;
const notFound_1 = __importDefault(require("./notFound"));
exports.NotFound = notFound_1.default;
const badRequest_1 = __importDefault(require("./badRequest"));
exports.BadRequestErr = badRequest_1.default;
const unauthorized_1 = __importDefault(require("./unauthorized"));
exports.Unauthorized = unauthorized_1.default;
const unauthenticated_1 = __importDefault(require("./unauthenticated"));
exports.Unauthenticated = unauthenticated_1.default;
const defaultError_1 = __importDefault(require("./defaultError"));
exports.CustomError = defaultError_1.default;
