import React, { useEffect, useRef } from "react";
import useMessagesContext from "../hooks/useMessagesContext";
import MessageListItem from "./MessageListItem";
import { socket } from "../sockets/socket";
import useChannelsContext from "../hooks/useChannelsContext";

const MessageList = () => {
	const { messages, scrollDown, setScrollDown } = useMessagesContext();
	const { activeUsers } = useChannelsContext();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollDown) {
			ref.current?.scrollIntoView({ behavior: "smooth" });
			setScrollDown(false);
		}
	}, [scrollDown, setScrollDown]);

	return (
		<>
			<div className="flex flex-1 flex-col-reverse overflow-y-auto">
				<div ref={ref} />
				<div>
					{messages?.map((message) => (
						<MessageListItem message={message} />
					))}
				</div>
			</div>
			<div className="w-48 flex flex-col overflow-y-auto">
				{activeUsers.map((user) => (
					<div style={{ color: user.color }}>{user.username} </div>
				))}
			</div>
		</>
	);
};

export default MessageList;
