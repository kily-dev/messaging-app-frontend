import React from "react";
import type { Channel } from "../hooks/useChannels";

interface Props {
	channel: Channel;
}

const ChannelListItem = ({ channel }: Props) => {
	return <span>{channel.name}</span>;
};

export default ChannelListItem;
