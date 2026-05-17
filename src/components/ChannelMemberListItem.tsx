import profileImage from "../assets/profile.png";
import type { User } from "../hooks/useUsers";

interface Props {
	user: User;
}

const ChannelMemberListItem = ({ user }: Props) => {
	return (
		<div
			className={`flex  min-w-50 hover:bg-neutral-900 mx-2 py-3 pl-2 rounded-md mb-1`}
		>
			<div
				style={
					user.color === "NC"
						? { backgroundColor: "#5a6270" }
						: { backgroundColor: user.color }
				}
				className="relative flex-none h-6 w-6 rounded-full overflow-hidden"
			>
				<img
					src={profileImage}
					className="h-6 mix-blend-multiply"
				></img>
			</div>
			<span
				className=" flex-1 ml-2 font-semibold"
				style={{ color: user.color }}
			>
				{user.username}{" "}
			</span>
		</div>
	);
};

export default ChannelMemberListItem;
