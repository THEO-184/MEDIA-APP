import { StatusCodes } from "http-status-codes";
import CustomError from "./defaultError";

class Uauthenticated extends CustomError {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

export default Uauthenticated;
