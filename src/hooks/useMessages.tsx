import { useState } from "react";
import { z } from "zod";

const messageSchema = z.object({
	id: z.uuidv4(),
	content: z.string().min(1),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type Message = z.infer<typeof messageSchema>;

const useMessages = () => {
	const [messages, setMessages] = useState<Message[]>();

	return { messages };
};

export default useMessages;
