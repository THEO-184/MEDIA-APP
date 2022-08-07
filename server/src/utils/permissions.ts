import { Unauthorized } from "../errors";
import { UserDocument, UserTokenPayload } from "./../types/userTypes";

export const checkPermission = (
	user: UserTokenPayload,
	resourceId: UserDocument["_id"]
) => {
	if (user._id === resourceId.toString()) return;
	else throw new Unauthorized("user not authorized");
};
