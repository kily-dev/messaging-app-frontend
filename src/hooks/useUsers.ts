import { useEffect, useState } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const userSchema = z.object({
	_id: z.string(),
	username: z.string().min(8),
	color: z.string().default("NC"),
});

export type User = z.infer<typeof userSchema>;

export const url = "http://localhost:3000/users";

const useUsers = () => {
	const [currentUser, setCurrentUser] = useState<User>();

	useEffect(() => {
		let sessionId = localStorage.getItem("sessionId");
		if (!sessionId) {
			sessionId = uuidv4();
			localStorage.setItem("sessionId", sessionId);
		}

		axios
			.get<User>(url + "/current", { params: { sessionId: sessionId } })
			.then((res) => setCurrentUser(res.data));
	}, []);

	return { currentUser };
};

export default useUsers;
