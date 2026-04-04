import React, { useEffect } from "react";
import useChannelsContext from "../hooks/useChannelsContext";
import ChannelListItem from "./ChannelListItem";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Channel } from "../hooks/useChannels";
import { url as channelUrl } from "../hooks/useChannels";

const ChannelList = () => {
	const { channels, currentChannel, channelSwitch } = useChannelsContext();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id !== currentChannel?._id) {
			axios
				.get<Channel>(channelUrl + "/" + id)
				.then((res) => channelSwitch(res.data))
				.catch((err) => console.error(err));
		}
	}, [id, currentChannel, channelSwitch]);

	return (
		<>
			{channels?.map((channel) => (
				<ChannelListItem channel={channel} />
			))}
		</>
	);
};

export default ChannelList;
