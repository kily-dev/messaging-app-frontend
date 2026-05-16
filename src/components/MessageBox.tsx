import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { messageBoxSchema, type MessageBoxShape } from "../hooks/useMessages";
import useMessagesContext from "../hooks/useMessagesContext";
import profileImage from "../assets/profile.png";
import { IoIosCloseCircle } from "react-icons/io";

const MessageBox = () => {
	const {
		setFocus,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<MessageBoxShape>({
		resolver: zodResolver(messageBoxSchema),
		defaultValues: {
			content: "",
		},
	});

	const { postMessage, referencedMessage, setReferencedMessage } =
		useMessagesContext();

	const submitHandler = async (data: MessageBoxShape) => {
		postMessage(data);
		setReferencedMessage(null);
		reset();
	};

	const onCancelReply = () => {
		setReferencedMessage(null);
	};

	useEffect(() => {
		if (referencedMessage) {
			setFocus("content");
		}
	}, [referencedMessage]);
	return (
		<form className="w-full" onSubmit={handleSubmit(submitHandler)}>
			{referencedMessage ? (
				<div className="bg-neutral-900 flex text-white py-1 pl-3 pr-2 mt-1 w-full items-center justify-between rounded-t-xl border border-b-0 border-neutral-800  focus:outline-none ">
					<div
						className={`flex  gap-1 cursor-pointer mb-1 text-neutral-200 text-sm`}
					>
						Replying to
						<span
							className=" flex-1 ml-2 font-semibold "
							style={{ color: referencedMessage.color }}
						>
							{referencedMessage.username}{" "}
						</span>
					</div>
					<IoIosCloseCircle
						className="text-neutral-400 hover:text-neutral-200 cursor-pointer"
						onClick={onCancelReply}
					/>
				</div>
			) : (
				""
			)}
			<input
				className={`bg-neutral-900  text-white p-5  w-full ${referencedMessage ? "rounded-b-xl" : "rounded-xl"}  border border-neutral-800  focus:outline-none `}
				autoComplete="off"
				{...register("content")}
				id="content"
				placeholder="Message..."
			/>
		</form>
	);
};

export default MessageBox;
