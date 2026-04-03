import React from "react";
import useChannelsContext from "../hooks/useChannelsContext";
import ChannelListItem from "./ChannelListItem";

const ChannelList = () => {
	const { channels } = useChannelsContext();

	return (
		<>
			{channels?.map((channel) => (
				<ChannelListItem channel={channel} />
			))}
		</>
	);
};

export default ChannelList;
