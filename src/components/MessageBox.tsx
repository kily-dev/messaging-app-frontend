import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { messageBoxSchema, type MessageBoxShape } from "../hooks/useMessages";
import useMessagesContext from "../hooks/useMessagesContext";

const MessageBox = () => {
	const {
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

	const { postMessage } = useMessagesContext();

	const submitHandler = async (data: MessageBoxShape) => {
		postMessage(data);
		reset();
	};
	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<input
				{...register("content")}
				id="content"
				placeholder="Message..."
			/>
		</form>
	);
};

export default MessageBox;
