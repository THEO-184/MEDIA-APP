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
// local imports
import connectDb from "./db/connectDb";
import Template from "./template";
import expressErrorMiddleware from "./middlewares/express-error";

const app = express();
// routes imports
import userRoutes from "./routes/user.routes";

//

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
	res.status(StatusCodes.OK).send(Template());
});

app.use("/api/v1/users", userRoutes);

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