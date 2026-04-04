import React from "react";
import type { Channel } from "../hooks/useChannels";
import useChannelsContext from "../hooks/useChannelsContext";
import { useNavigate } from "react-router-dom";

interface Props {
	channel: Channel;
}

const ChannelListItem = ({ channel }: Props) => {
	const { channelSwitch, currentChannel } = useChannelsContext();
	const navigate = useNavigate();
	const handleClick = () => {
		channelSwitch(channel);
		navigate("/channel/" + channel._id);
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
