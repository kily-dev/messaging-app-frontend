import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../sockets/socket";
import useChannelsContext from "./useChannelsContext";
import useUsers from "./useUsers";
import useUsersContext from "./useUsersContext";

const messageSchema = z.object({
	_id: z.uuidv4(),
	content: z.string().min(1),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
	channelId: z.string(),
	status: z.enum(["sending", "sent", "error"]).default("sent"),
	userId: z.string(),
	username: z.string(),
	color: z.string(),
});

const url = "http://localhost:3000/messages";

export type Message = z.infer<typeof messageSchema>;

export const messageBoxSchema = messageSchema.omit({
	_id: true,
	createdAt: true,
	updatedAt: true,
	channelId: true,
	status: true,
	userId: true,
	username: true,
	color: true,
});

export type MessageBoxShape = z.infer<typeof messageBoxSchema>;

const useMessages = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const { currentChannel } = useChannelsContext();
	const [scrollDown, setScrollDown] = useState<boolean>(false);
	const { currentUser } = useUsersContext();

	useEffect(() => {
		axios
			.get<Message[]>(url, { params: { channelId: currentChannel?._id } })
			.then((res) => setMessages(res.data))
			.catch((err) => console.error(err));
	}, [currentChannel]);

	const postMessage = (messageBox: MessageBoxShape) => {
		if (!currentChannel) return;
		if (!currentUser) return;
		const now = new Date(Date.now());
		const newId = uuidv4();
		const newMessage: Message = {
			_id: newId,
			content: messageBox.content,
			createdAt: now,
			updatedAt: now,
			channelId: currentChannel?._id,
			status: "sending",
			userId: currentUser._id,
			color: currentUser.color,
			username: currentUser.username,
		};
		console.log(newMessage);
		setMessages((curr) => [...curr, newMessage]);
		setScrollDown(true);
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

	return { messages, postMessage, scrollDown, setScrollDown };
};

export default useMessages;
