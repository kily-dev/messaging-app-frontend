import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MessageBox from "../components/MessageBox";
import useChannelsContext from "../hooks/useChannelsContext";
import { Outlet } from "react-router-dom";
import ChannelList from "../components/ChannelList";
import TopBarButton from "../components/TopBarButton";
import { FaHashtag, FaUserCircle } from "react-icons/fa";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { useMediaQuery } from "react-responsive";

const MainLayout = () => {
	const { currentChannel } = useChannelsContext();
	const [isChannelsBarOpen, setChannelsBar] = useState<boolean>(true);
	const [isMembersBarOpen, setMembersBar] = useState<boolean>(true);

	const isDesktop = useMediaQuery({ query: "(min-width: 767px)" });

	useEffect(() => {
		if (isDesktop) {
			setChannelsBar(true);
			setMembersBar(true);
		} else {
			setChannelsBar(false);
			setMembersBar(false);
		}
	}, [isDesktop, setChannelsBar, setMembersBar]);
	return (
		<div className="flex flex-col min-h-screen max-h-screen overflow-hidden bg-neutral-950">
			<header className="flex-none">
				<nav>
					<NavBar />
				</nav>
			</header>

			<main className=" flex flex-1 h-full  overflow-hidden ">
				<>
					<div className="border-neutral-800 flex flex-1 max-h-full w-full flex-row border-t">
						<ChannelList isOpen={isChannelsBarOpen} />
						<div className="flex flex-col flex-1 max-h-full  overflow-hidden">
							<div className="flex-none flex text-neutral-200 font-semibold w-full border-neutral-800 items-center justify-between py-2 px-3 ">
								<div className="flex gap-5 items-center">
									<div>
										<TopBarButton
											onClick={() =>
												setChannelsBar((curr) => !curr)
											}
											icon={
												<TbLayoutSidebarLeftExpandFilled
													size={22}
												/>
											}
										/>
									</div>
									<div>
										{currentChannel ? (
											<div className="flex items-center gap-1">
												<FaHashtag className="text-neutral-500" />
												{currentChannel?.name}
											</div>
										) : (
											"Main Page"
										)}
									</div>
								</div>

								<div>
									{currentChannel ? (
										<TopBarButton
											onClick={() =>
												setMembersBar((curr) => !curr)
											}
											icon={<FaUserCircle size={20} />}
										/>
									) : (
										""
									)}
								</div>
							</div>

							<hr className="border-neutral-800"></hr>

							<div className="flex flex-1 max-h-full w-full overflow-hidden">
								{currentChannel ? (
									<Outlet context={{ isMembersBarOpen }} />
								) : (
									<div className="text-white w-full flex flex-col gap-3 items-center justify-center">
										<p className="text-3xl font-bold">
											Welcome to Schnell!
										</p>
										<p className="text-xl">
											Click on a Channel to join a
											conversation!
										</p>
										<div className="flex items-center justify-center text-lg text-neutral-400 hover: gap-6">
											<p className="hover:text-2xl duration-300 font-semibold">
												Created by Ilyass Kaddani
											</p>
											<p className="hover:text-2xl duration-300 font-semibold">
												Made using the MERN Stack
											</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</>
			</main>
		</div>
	);
};

export default MainLayout;
