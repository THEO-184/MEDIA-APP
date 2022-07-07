import { Unauthorized } from "../errors";
import { UserDocument, UserTokenPayload } from "./../types/userTypes";

export const checkPermission = (
	user: UserTokenPayload,
	resourceId: UserDocument
) => {
	if (user._id === resourceId._id.toString()) return;
	else throw new Unauthorized("user not authorized");
};
