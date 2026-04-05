import { z } from "zod";

const userSchema = z.object({
	_id: z.string(),
	username: z.string().min(8),
	color: z.string().default("NC"),
	sessionId: z.string(),
});

type User = z.infer<typeof userSchema>;

const useUsers = () => {};

export default useUsers;
