import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../sockets/socket";

const messageSchema = z.object({
	_id: z.uuidv4(),
	content: z.string().min(1),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
	status: z.enum(["sending", "sent", "error"]).default("sent"),
});

const url = "http://localhost:3000/messages";

export type Message = z.infer<typeof messageSchema>;

export const messageBoxSchema = messageSchema.omit({
	_id: true,
	createdAt: true,
	updatedAt: true,
	status: true,
});

export type MessageBoxShape = z.infer<typeof messageBoxSchema>;

const useMessages = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		axios
			.get<Message[]>(url)
			.then((res) => setMessages(res.data))
			.catch((err) => console.error(err));
	}, []);

	const postMessage = (messageBox: MessageBoxShape) => {
		const now = new Date(Date.now());
		const newId = uuidv4();
		const newMessage: Message = {
			_id: newId,
			content: messageBox.content,
			createdAt: now,
			updatedAt: now,
			status: "sending",
		};
		console.log(newMessage);
		setMessages((curr) => [...curr, newMessage]);
		axios
			.post(url, { ...newMessage, socketId: socket.id })
			.then((res) =>
				setMessages((curr) =>
					curr.map((message) =>
						message._id === newId ? res.data : message,
					),
				),
			)
			.catch(() => {
				setMessages((curr) =>
					curr.filter((message) => message._id !== newId),
				);
			});
	};

	useEffect(() => {
		const handler = (msg: Message) => setMessages((curr) => [...curr, msg]);
		socket.on("receive_message", handler);
		return () => {
			socket.off("receive_message", handler);
		};
	}, []);

	return { messages, postMessage };
};

export default useMessages;
