import React from "react";
import useMessagesContext from "../hooks/useMessagesContext";
import MessageListItem from "./MessageListItem";

const MessageList = () => {
	const { messages } = useMessagesContext();
	return (
		<div>
			<h2>Main Channel</h2>
			{messages?.map((message) => (
				<MessageListItem message={message} />
			))}
		</div>
	);
};

export default MessageList;
