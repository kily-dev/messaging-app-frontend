import React from "react";
import ChannelList from "./ChannelList";
import useChannelsContext from "../hooks/useChannelsContext";

const NavBar = () => {
	const { currentChannel } = useChannelsContext();
	return (
		<div>
			<h1>Instant Messaging App</h1>

			<ChannelList />

			<p>You are currently on the {currentChannel?.name} channel</p>
		</div>
	);
};

export default NavBar;
