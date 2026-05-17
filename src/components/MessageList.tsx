import { useEffect, useRef } from "react";
import useMessagesContext from "../hooks/useMessagesContext";
import MessageListItem from "./MessageListItem";
import useChannelsContext from "../hooks/useChannelsContext";
import MessageBox from "./MessageBox";
import ChannelMemberList from "./ChannelMemberList";
import { useOutletContext } from "react-router-dom";

const MessageList = () => {
	const {
		messages,
		scrollDown,
		setScrollDown,
		isNearBottom,
		setIsNearBottom,
	} = useMessagesContext();
	const { activeUsers } = useChannelsContext();
	const { isMembersBarOpen } = useOutletContext<{
		isMembersBarOpen: boolean;
	}>();
	const ref = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollDown) {
			ref.current?.scrollIntoView({ behavior: "smooth" });
			setScrollDown(false);
		}
	}, [scrollDown, setScrollDown]);

	const onScroll = () => {
		if (scrollRef.current) {
			setIsNearBottom(scrollRef.current.scrollTop > -400);
		}
		console.log(isNearBottom);
	};

	return (
		<>
			<div
				ref={scrollRef}
				onScroll={onScroll}
				className=" flex flex-1 min-h-0 flex-col-reverse overflow-y-auto scroll-stable"
			>
				<div className="sticky ml-2 mr-1 bottom-2 z-99 justify-items-center ">
					<MessageBox />
				</div>

				<div className="sticky min-h-2 bottom-0 bg-neutral-950 z-25 " />

				<div ref={ref} />

				<div className=" py-5  ">
					{messages?.map((message, index) => {
						const previousMessage = messages[index - 1];
						let isGrouped = false;
						if (previousMessage && message) {
							if (
								previousMessage.userId === message.userId &&
								message.userId != "unknown"
							)
								if (
									message.createdAt &&
									previousMessage.createdAt
								) {
									const diff =
										new Date(message.createdAt).getTime() -
										new Date(
											previousMessage.createdAt,
										).getTime();
									if (diff < 420000 && diff > -420000) {
										if (!message.isReply) {
											isGrouped = true;
										}
									}
								}
						}

						return (
							<MessageListItem
								message={message}
								isGrouped={isGrouped}
							/>
						);
					})}
				</div>
			</div>
			<ChannelMemberList isOpen={isMembersBarOpen} users={activeUsers} />
		</>
	);
};

export default MessageList;
