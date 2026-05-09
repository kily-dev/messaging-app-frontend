import React from "react";
import ChannelMemberListItem from "./ChannelMemberListItem";
import type { User } from "../hooks/useUsers";

interface Props {
	users: User[];
	isOpen: boolean;
}

const ChannelMemberList = ({ users, isOpen }: Props) => {
	return (
		<div
			className={` ${isOpen ? "w-62" : "w-0"}   border-l border-neutral-800 flex flex-col flex-none overflow-y-auto transition-all duration-300 scroll-stable`}
		>
			<span className="text-neutral-400 min-w-50 text-center text-sm font-semibold mt-1 mb-2 mx-2">
				Members in Channel
			</span>
			{users.map((user) => (
				<ChannelMemberListItem user={user} />
			))}
		</div>
	);
};

export default ChannelMemberList;
