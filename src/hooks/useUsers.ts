import { useEffect, useState } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { socket } from "../sockets/socket";

const userSchema = z.object({
	_id: z.string(),
	username: z.string().min(8),
	color: z.string().default("NC"),
});

export type User = z.infer<typeof userSchema>;

export const url = "http://localhost:3000/users";

const useUsers = () => {
	const [currentUser, setCurrentUser] = useState<User>();

	const fetchCurrentUser = (sessionId: string) => {
		axios
			.get<User>(url + "/current", {
				params: { sessionId: sessionId },
				data: { socketId: socket.id },
			})
			.then((res) => {
				setCurrentUser(res.data);

				socket.emit("first_use", sessionId);
			})
			.catch(() => setTimeout(() => fetchCurrentUser(sessionId), 1000));
	};

	useEffect(() => {
		let sessionId = localStorage.getItem("sessionId");
		if (!sessionId) {
			sessionId = uuidv4();
			localStorage.setItem("sessionId", sessionId);
		}

		fetchCurrentUser(sessionId);
	}, []);

	return { currentUser, setCurrentUser };
};

export default useUsers;
