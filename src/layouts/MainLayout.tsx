import React from "react";
import NavBar from "../components/NavBar";
import MessageBox from "../components/MessageBox";
import useChannelsContext from "../hooks/useChannelsContext";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	const { currentChannel } = useChannelsContext();
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<header className="flex-none">
				<nav>
					<NavBar />
				</nav>
			</header>

			<main className="flex-1 flex flex-col">
				{currentChannel ? (
					<>
						<div className=" overflow-y-auto flex flex-col-reverse h-[calc(100vh-6.5rem)]">
							<Outlet />
						</div>
						<div className=" flex-none ">
							<MessageBox />
						</div>
					</>
				) : (
					"Join a Channel to start!"
				)}
			</main>
		</div>
	);
};

export default MainLayout;
