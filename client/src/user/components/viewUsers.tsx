import { Follower } from "../../common/interfaces/api-interfaces";
import DefaultImg from "../../assets/images/profile-icon-png-899.png";
interface Props {
	people: Follower[];
}

const ViewUsers = ({ people }: Props) => {
	return (
		<div className="flex w-full items-center justify-center my-7">
			{people.map((person) => {
				return (
					<div key={person._id} className="text-center mx-3">
						<div>
							<img
								src={person.photo || DefaultImg}
								alt={person.name}
								className="w-20 h-20 rounded-full"
							/>
						</div>
						<h3 className="text-indigo-900 text-xl font-semibold">
							{person.name}
						</h3>
					</div>
				);
			})}
		</div>
	);
};

export default ViewUsers;
