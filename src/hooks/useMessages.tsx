import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const messageSchema = z.object({
	_id: z.uuidv4(),
	content: z.string().min(1),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

const url = "http://localhost:3000/messages";

export type Message = z.infer<typeof messageSchema>;

export const messageBoxSchema = messageSchema.omit({
	_id: true,
	createdAt: true,
	updatedAt: true,
});

export type MessageBoxShape = z.infer<typeof messageBoxSchema>;

const useMessages = () => {
	const [messages, setMessages] = useState<Message[]>();

	useEffect(() => {
		axios
			.get<Message[]>(url)
			.then((res) => setMessages(res.data))
			.catch((err) => console.error(err));
	}, []);

	const postMessage = (messageBox: MessageBoxShape) => {
		const now = new Date(Date.now());
		const newMessage: Message = {
			_id: uuidv4(),
			content: messageBox.content,
			createdAt: now,
			updatedAt: now,
		};
		console.log(newMessage);
		axios.post(url, newMessage);
	};

	return { messages, postMessage };
};

export default useMessages;
