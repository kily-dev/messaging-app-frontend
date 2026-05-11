import React from "react";
import type { Message } from "../hooks/useMessages";
import MessageOptionsItem from "./MessageOptionsItem";
import { MdModeEdit } from "react-icons/md";
import useMessagesContext from "../hooks/useMessagesContext";
import useUsersContext from "../hooks/useUsersContext";

interface Props {
	message: Message;
	onEditClick: () => void;
}

const MessageOptions = ({ message, onEditClick }: Props) => {
	const { currentUser } = useUsersContext();

	return (
		<div className="absolute -top-4 right-2 bg-neutral-900 flex gap-1 border p-1 border-neutral-800 text-neutral-300 rounded-md">
			{currentUser?._id === message.userId ? (
				<MessageOptionsItem
					onClick={onEditClick}
					icon={<MdModeEdit size={20} />}
				/>
			) : (
				"Placeholder"
			)}
		</div>
	);
};

export default MessageOptions;
