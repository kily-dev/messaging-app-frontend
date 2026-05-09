import React, { useState } from "react";
import type { Message } from "../hooks/useMessages";
import profileImage from "../assets/profile.png";
import MessageOptions from "./MessageOptions";

interface Props {
	message: Message;
	isGrouped: boolean;
}

const MessageListItem = ({ message, isGrouped }: Props) => {
	const today = new Date();
	const [isHovered, setIsHovered] = useState(false);
	let messageDate;
	if (message.createdAt) messageDate = new Date(message.createdAt);
	const dateStatus = messageDate
		? messageDate.getFullYear() === today.getFullYear()
			? messageDate.getMonth() === today.getMonth()
				? messageDate.getDate() === today.getDate()
					? "today"
					: messageDate.getDate() + 1 === today.getDate()
						? "yesterday"
						: messageDate.getDate() - 1 === today.getDate()
							? "tomorrow"
							: messageDate.getDate() < today.getDate()
								? "old"
								: "old"
				: "old"
			: "old"
		: "none";

	return (
		<>
			<div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={`flex relative pl-8 hover:bg-neutral-900   transition-transform py-1 ${isGrouped ? "" : "mt-5"} `}
			>
				{isHovered && <MessageOptions />}
				<div className="flex-none text-white w-16">
					{isGrouped ? (
						<span
							className={`text-neutral-500 ${isHovered ? "" : "invisible"} text-xs `}
						>
							{message.createdAt && (
								<>
									{new Date(
										message.createdAt,
									).toLocaleTimeString(undefined, {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</>
							)}
						</span>
					) : (
						<div
							style={
								message.color === "NC"
									? { backgroundColor: "#5a6270" }
									: { backgroundColor: message.color }
							}
							className="relative flex-none h-12 w-12 rounded-full overflow-hidden"
						>
							<img
								src={profileImage}
								className="h-12 mix-blend-multiply"
							></img>
						</div>
					)}
				</div>
				<div className="flex-1 flex-col ">
					<div className="flex-none">
						{isGrouped ? (
							""
						) : (
							<>
								<span
									style={
										message.color === "NC"
											? { color: "#cccccc" }
											: { color: message.color }
									}
									className="mr-2 font-semibold"
								>
									{message.username}
								</span>

								<span className="text-neutral-500 text-xs">
									{message.createdAt && (
										<>
											{dateStatus === "old"
												? new Date(
														message.createdAt,
													).toLocaleDateString(
														undefined,
													)
												: dateStatus === "yesterday"
													? "Yesterday at"
													: dateStatus === "tomorrow"
														? "Tomorrow at"
														: dateStatus ===
																"none" &&
															"Unknown Time"}
											{dateStatus !== "today" && " "}
											{new Date(
												message.createdAt,
											).toLocaleTimeString(undefined, {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</>
									)}
								</span>
							</>
						)}
					</div>
					<div className="flex-1">
						{" "}
						<div
							className={`  wrap-anywhere ${message.status === "sending" ? "text-neutral-500" : "text-white"}  pr-5 `}
						>
							{message.content}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MessageListItem;
