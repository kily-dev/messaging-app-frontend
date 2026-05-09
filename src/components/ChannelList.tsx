import React, { useEffect } from "react";
import useChannelsContext from "../hooks/useChannelsContext";
import ChannelListItem from "./ChannelListItem";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Channel } from "../hooks/useChannels";
import { url as channelUrl } from "../hooks/useChannels";

interface Props {
	isOpen: boolean;
}

const ChannelList = ({ isOpen }: Props) => {
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
			<div
				className={` ${isOpen ? "w-62" : "w-0"}  border-r border-neutral-800 flex flex-col flex-none overflow-y-auto overflow-y-hidden transition-all duration-300 scroll-stable`}
			>
				<span className="text-neutral-400 text-center text-sm font-semibold mt-1 mb-2 mx-2">
					Channels
				</span>
				{channels?.map((channel) => (
					<ChannelListItem channel={channel} />
				))}
			</div>
		</>
	);
};

export default ChannelList;
