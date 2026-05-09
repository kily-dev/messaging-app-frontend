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
		<form className="w-full" onSubmit={handleSubmit(submitHandler)}>
			<input
				className="bg-neutral-900  text-white p-5 mt-1 w-full rounded-xl border border-neutral-800  focus:outline-none focus:shadow-[0_0_40px_0px_var(--tw-shadow-color)] shadow-primary-800 transition-all duration-500"
				autoComplete="off"
				{...register("content")}
				id="content"
				placeholder="Message..."
			/>
		</form>
	);
};

export default MessageBox;
