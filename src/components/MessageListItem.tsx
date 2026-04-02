import React from "react";
import type { Message } from "../hooks/useMessages";

interface Props {
	message: Message;
}

const MessageListItem = ({ message }: Props) => {
	return (
		<>
			<div>
				Message ID {message._id}: {message.content}
				{"  "}
				{message.status === "sending" && "(sending...)"}
				<hr />
			</div>
		</>
	);
};

export default MessageListItem;
