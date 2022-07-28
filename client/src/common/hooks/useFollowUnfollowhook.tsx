import { useState } from "react";
import { useAuth } from "../../components/AppContext";
import { TabId } from "../../utils/utilities";
import { CreateUser, createUserFn, User } from "../interfaces/api-interfaces";
import { useFollowUser, useUnFollowPerson } from "../queries/api-user";

const useFollowUnfollowhook = () => {
	const auth = useAuth();
	const [person, setPerson] = useState<User>({} as User);
	const [people, setPeople] = useState<User["followers" | "following"]>([]);
	const [userId, setUserId] = useState("");
	const [isFollowing, setIsFollowing] = useState(false);
	const [tabId, setTabId] = useState(TabId.Tab2);

	const onSuccess: createUserFn = (res: CreateUser) => {
		setPerson(res.user);
		const isFollowUser = res.user.followers.some(
			(follower) => follower._id === auth?._id
		);
		setPeople(res.user.followers);
		setIsFollowing(isFollowUser);
		setUserId(res.user._id);
	};

	const onFollowSuccess = (res: CreateUser) => onSuccess(res);
	const unFollowSuccess = onFollowSuccess;

	const { mutate: handleFollowUser } = useFollowUser(onFollowSuccess);
	const { mutate: handleUnFollowUser } = useUnFollowPerson(unFollowSuccess);

	const handleSetActiveTab = (id: TabId) => {
		setTabId(id);
		if (id == TabId.Tab3) {
			setPeople(person.following);
		} else {
			setPeople(person.followers);
		}
	};

	return [
		handleUnFollowUser,
		handleSetActiveTab,
		onSuccess,
		isFollowing,
		person,
		people,
		userId,
		handleFollowUser,
		tabId,
		setTabId,
		setPeople,
	] as const;
};

export default useFollowUnfollowhook;
