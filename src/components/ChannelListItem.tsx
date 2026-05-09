import React from "react";
import type { Channel } from "../hooks/useChannels";
import useChannelsContext from "../hooks/useChannelsContext";
import { useNavigate } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";

interface Props {
	channel: Channel;
}

const ChannelListItem = ({ channel }: Props) => {
	const { currentChannel } = useChannelsContext();
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/channel/" + channel._id);
	};
	return (
		<div
			className={` min-w-50 cursor-pointer px-2 py-2 mb-0.5 mx-2 flex items-center gap-2  rounded-lg border-neutral-800 font-semibold ${currentChannel?._id === channel._id ? "bg-neutral-800 text-neutral-50" : "text-neutral-500 hover:bg-neutral-900 hover:text-neutral-50"} cursor-pointer  `}
			onClick={handleClick}
		>
			<FaHashtag /> {channel.name}
		</div>
	);
};

export default ChannelListItem;
