import React from "react";
import NavBar from "../components/NavBar";
import MessageBox from "../components/MessageBox";
import useChannelsContext from "../hooks/useChannelsContext";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	const { currentChannel } = useChannelsContext();
	return (
		<>
			<header>
				<nav>
					<NavBar />
				</nav>
			</header>

			<main>
				{currentChannel ? (
					<>
						<div>
							<Outlet />
						</div>
						<MessageBox />
					</>
				) : (
					"Join a Channel to start!"
				)}
			</main>
		</>
	);
};

export default MainLayout;
