import React from "react";
import MessageBox from "./components/MessageBox";
import MessageList from "./components/MessageList";
import ChannelList from "./components/ChannelList";

const App = () => {
	return (
		<>
			<h1>Instant Messaging App</h1>

			<ChannelList />

			<p>You are currently on the main channel</p>

			<MessageList />

			<MessageBox />
		</>
	);
};

export default App;
