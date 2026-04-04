import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import { socket } from "../sockets/socket";

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
	const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);

	useEffect(() => {
		axios
			.get<Channel[]>(url)
			.then((data) => setChannels(data.data))
			.catch((err) => console.error(err));
	}, []);

	const channelSwitch = (channel: Channel) => {
		socket.emit("join_room", channel._id);
		setCurrentChannel(channel);
	};

	return { channels, currentChannel, channelSwitch };
};

export default useChannels;
