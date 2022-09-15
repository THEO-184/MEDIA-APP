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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary = require("cloudinary").v2;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileUpload_1 = __importDefault(require("express-fileUpload"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const compression_1 = __importDefault(require("compression"));
const http_status_codes_1 = require("http-status-codes");
// local imports
const connectDb_1 = __importDefault(require("./db/connectDb"));
const template_1 = __importDefault(require("./template"));
const express_error_1 = __importDefault(require("./middlewares/express-error"));
const app = (0, express_1.default)();
// routes imports
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
//
// cloudinary
cloudinary.config({
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    cloud_name: "dolgpezth",
});
app.use((0, morgan_1.default)("tiny"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, express_fileUpload_1.default)({ useTempFiles: true }));
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use((0, express_rate_limit_1.default)({
    windowMs: 60 * 100 * 15,
    max: 60,
}));
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, helmet_1.default)());
app.get("/", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).send((0, template_1.default)());
});
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/posts", authMiddleware_1.authMiddleware, post_routes_1.default);
// middlewares
// middlewares
app.use(express_error_1.default);
const db_URL = process.env.MONGO_URI;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectDb_1.default)(db_URL);
        app.listen(5000, () => {
            console.log(`server running on port 5000`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
