import React from "react";
import type { Message } from "../hooks/useMessages";
import MessageOptionsItem from "./MessageOptionsItem";
import { MdModeEdit } from "react-icons/md";
import { HiMiniTrash } from "react-icons/hi2";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import useMessagesContext from "../hooks/useMessagesContext";
import useUsersContext from "../hooks/useUsersContext";

interface Props {
	message: Message;
	onEditClick: () => void;
}

const MessageOptions = ({ message, onEditClick }: Props) => {
	const { currentUser } = useUsersContext();
	const { deleteMessage, setReferencedMessage } = useMessagesContext();

	const onDelete = () => {
		deleteMessage(message._id);
	};

	const onReply = () => {
		setReferencedMessage(message);
	};

	return (
		<div className="absolute -top-4 right-2 bg-neutral-900 flex gap-1 border p-1 border-neutral-800 text-neutral-300 rounded-md">
			<MessageOptionsItem
				onClick={onReply}
				hoverColor="neutral"
				icon={<PiArrowBendUpLeftBold size={20} />}
			/>
			{currentUser?._id === message.userId ? (
				<>
					<MessageOptionsItem
						onClick={onEditClick}
						hoverColor="neutral"
						icon={<MdModeEdit size={20} />}
					/>

					<MessageOptionsItem
						hoverColor="danger"
						onClick={onDelete}
						icon={
							<HiMiniTrash
								className="text-danger-500"
								size={20}
							/>
						}
					/>
				</>
			) : (
				""
			)}
		</div>
	);
};

export default MessageOptions;
