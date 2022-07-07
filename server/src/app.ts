import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { StatusCodes } from "http-status-codes";
import path from "path";
// local imports
import connectDb from "./db/connectDb";
import Template from "./template";
import expressErrorMiddleware from "./middlewares/express-error";

const app = express();
// routes imports
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
//
const CURRENT_WORKING_DIR = process.cwd();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_SECRET!));
app.use(compression());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
	res.status(StatusCodes.OK).send(Template());
});

// app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "public")));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

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
