import React, { useEffect, useRef } from "react";
import useMessagesContext from "../hooks/useMessagesContext";
import MessageListItem from "./MessageListItem";
import { socket } from "../sockets/socket";

const MessageList = () => {
	const { messages, scrollDown, setScrollDown } = useMessagesContext();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollDown) {
			ref.current?.scrollIntoView({ behavior: "smooth" });
			setScrollDown(false);
		}
	}, [scrollDown, setScrollDown]);

	return (
		<div>
			<h2>Main Channel</h2>
			{messages?.map((message) => (
				<MessageListItem message={message} />
			))}
			<div ref={ref} />
		</div>
	);
};

export default MessageList;
