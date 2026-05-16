import React from "react";
import type { Message } from "../hooks/useMessages";
import profileImage from "../assets/profile.png";

interface Props {
	message: Message;
}

const DeletedMessagePreview = ({ message }: Props) => {
	const today = new Date();
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
		<div
			className={`flex flex-col relative  transition-transform  rounded-md p-2 shadow-md bg-neutral-950 border border-neutral-800   `}
		>
			<div className={`flex flex-1`}>
				<div className="flex-none text-white w-16">
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
				</div>
				<div className="flex-1 flex-col ">
					<div className="flex-none">
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
											).toLocaleDateString(undefined)
										: dateStatus === "yesterday"
											? "Yesterday at"
											: dateStatus === "tomorrow"
												? "Tomorrow at"
												: dateStatus === "none" &&
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
					</div>
					<div className="flex-1">
						{" "}
						<div
							className={`  wrap-anywhere ${message.status === "sending" ? "text-neutral-500" : "text-white"}  pr-5 `}
						>
							<span className="line-clamp-4">
								{message.content}
							</span>

							{message.edited ? (
								<span
									className={`text-neutral-500 ml-1 text-xs `}
								>
									(edited)
								</span>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeletedMessagePreview;
