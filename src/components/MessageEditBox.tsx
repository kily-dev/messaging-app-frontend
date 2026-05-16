import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
	messageBoxSchema,
	type Message,
	type MessageBoxShape,
} from "../hooks/useMessages";
import { zodResolver } from "@hookform/resolvers/zod";
import useMessagesContext from "../hooks/useMessagesContext";

interface Props {
	message: Message;
}

const MessageEditBox = ({ message }: Props) => {
	const {
		setFocus,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<MessageBoxShape>({
		resolver: zodResolver(messageBoxSchema),
		defaultValues: {
			content: message.content,
		},
	});
	const { editedMessage, setEditedMessage, putMessage } =
		useMessagesContext();

	const submitHandler = async (data: MessageBoxShape) => {
		console.log("Edit Sent: ", data);
		putMessage(data);
		reset();
		setEditedMessage("");
	};

	setFocus("content");
	return (
		<form className="w-full" onSubmit={handleSubmit(submitHandler)}>
			<input
				className="bg-neutral-900  text-white p-5 mt-1 w-full rounded-xl border border-neutral-800  focus:outline-none transition-all duration-500"
				autoComplete="off"
				{...register("content")}
				id="content"
				placeholder="Edited Message..."
			/>
		</form>
	);
};

export default MessageEditBox;
