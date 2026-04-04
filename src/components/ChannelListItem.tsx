import React from "react";
import type { Channel } from "../hooks/useChannels";
import useChannelsContext from "../hooks/useChannelsContext";

interface Props {
	channel: Channel;
}

const ChannelListItem = ({ channel }: Props) => {
	const { channelSwitch, currentChannel } = useChannelsContext();
	const handleClick = () => {
		channelSwitch(channel);
	};
	return (
		<span onClick={handleClick}>
			{" "}
			{channel.name}{" "}
			{currentChannel?._id === channel._id && "Here now"}{" "}
		</span>
	);
};

export default ChannelListItem;
