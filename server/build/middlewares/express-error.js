"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressErrorMiddleware = (err, req, res, next) => {
    const customErr = {
        statusCode: err.statusCode || 500,
        msg: err.message || "INTERNAL SERVER ERROR",
    };
    if (err.name === "ValidationError") {
        customErr.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
        customErr.statusCode = 400;
    }
    if (err.name === "UnauthorizedError") {
        customErr.msg = `${err.name} : ${err.message}`;
        customErr.statusCode = 401;
    }
    if (err.code && err.code === 11000) {
        customErr.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customErr.statusCode = 400;
    }
    if (err.name === "CastError") {
        customErr.msg = `No item found with id : ${err.value}`;
    }
    return res.status(customErr.statusCode).send({ msg: customErr.msg });
};
exports.default = expressErrorMiddleware;
