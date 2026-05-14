import React, { useEffect, useState } from "react";
import type { Message } from "../hooks/useMessages";
import profileImage from "../assets/profile.png";
import MessageOptions from "./MessageOptions";
import useMessagesContext from "../hooks/useMessagesContext";
import MessageEditBox from "./MessageEditBox";
import useUsersContext from "../hooks/useUsersContext";

interface Props {
	message: Message;
	isGrouped: boolean;
}

const MessageListItem = ({ message, isGrouped }: Props) => {
	const today = new Date();
	const [isHovered, setIsHovered] = useState(false);
	const [mode, setMode] = useState<"edit" | "view">("view");
	const { editedMessage, setEditedMessage } = useMessagesContext();
	const { currentUser } = useUsersContext();
	let messageDate;

	const triggerEditMode = () => {
		setEditedMessage(message._id);
		setMode("edit");
	};

	useEffect(() => {
		if (editedMessage != message._id) {
			setMode("view");
		}
	}, [editedMessage, setMode, message._id]);

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
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`flex flex-col relative py-1 transition-transform ${message.referencedUserId === currentUser?._id && message.userId !== currentUser._id ? "bg-amber-500/10" : ""} ${isGrouped ? "" : "mt-5"} rounded-r-sm ${mode === "view" ? (message.referencedUserId === currentUser?._id && message.userId !== currentUser._id ? "hover:bg-amber-800/10" : "hover:bg-neutral-900 ") : "bg-neutral-900"} `}
		>
			{isHovered && mode === "view" && (
				<MessageOptions
					onEditClick={triggerEditMode}
					message={message}
				/>
			)}
			{message.isReply ? (
				<div className="flex flex-none mb-1 text-white">
					<div className="w-24"></div>
					<div className="flex-1 flex text-xs ">
						<div className="flex-none">
							<div className="flex items-center">
								<div
									style={
										message.color === "NC"
											? { backgroundColor: "#5a6270" }
											: {
													backgroundColor:
														message.referencedColor,
												}
									}
									className="relative flex-none h-4 w-4 rounded-full overflow-hidden"
								>
									<img
										src={profileImage}
										className="h-4 mix-blend-multiply"
									></img>
								</div>
								<span
									className=" flex-1 ml-1 font-semibold"
									style={{
										color: message.referencedColor,
									}}
								>
									<div className="flex-1">
										{message.referencedUsername}
									</div>
								</span>
							</div>
						</div>

						<div className=" ml-1 line-clamp-1 max-w-196 text-neutral-200">
							{message.referencedMessageContent}
						</div>
					</div>
				</div>
			) : (
				""
			)}
			<div className={`flex flex-1  pl-8     `}>
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
							{mode === "edit" ? (
								<MessageEditBox message={message} />
							) : (
								<>
									{message.content}
									{message.edited ? (
										<span
											className={`text-neutral-500 ml-1 text-xs `}
										>
											(edited)
										</span>
									) : (
										""
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageListItem;
