import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";

const channelSchema = z.object({
	_id: z.string(),
	name: z.string().min(1),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type Channel = z.infer<typeof channelSchema>;

const url = "http://localhost:3000/channels";

const useChannels = () => {
	const [channels, setChannels] = useState<Channel[]>();

	useEffect(() => {
		axios
			.get<Channel[]>(url)
			.then((data) => setChannels(data.data))
			.catch((err) => console.error(err));
	}, []);

	return { channels };
};

export default useChannels;
