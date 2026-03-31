import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";

const messageSchema = z.object({
	_id: z.uuidv4(),
	content: z.string().min(1),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

const url = "http://localhost:3000/messages";

export type Message = z.infer<typeof messageSchema>;

const useMessages = () => {
	const [messages, setMessages] = useState<Message[]>();

	useEffect(() => {
		axios
			.get<Message[]>(url)
			.then((res) => setMessages(res.data))
			.catch((err) => console.error(err));
	}, []);

	return { messages };
};

export default useMessages;
