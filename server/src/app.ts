import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
const cloudinary = require("cloudinary").v2;
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileUpload";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { StatusCodes } from "http-status-codes";
// local imports
import connectDb from "./db/connectDb";
import Template from "./template";
import expressErrorMiddleware from "./middlewares/express-error";

const app = express();
// routes imports
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
//

// cloudinary
cloudinary.config({
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET,
	cloud_name: "dolgpezth",
});

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cookieParser(process.env.JWT_SECRET!));
app.use(compression());
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	})
);
app.use(helmet());

app.get("/", (req, res) => {
	res.status(StatusCodes.OK).send(Template());
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);

// middlewares

// middlewares

app.use(expressErrorMiddleware);

const db_URL = process.env.MONGO_URI!;

const start = async () => {
	try {
		await connectDb(db_URL);
		app.listen(5000, () => {
			console.log(`server running on port 5000`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
