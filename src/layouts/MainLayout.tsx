import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MessageBox from "../components/MessageBox";
import useChannelsContext from "../hooks/useChannelsContext";
import { Outlet } from "react-router-dom";
import ChannelList from "../components/ChannelList";
import TopBarButton from "../components/TopBarButton";
import { FaHashtag, FaUserCircle } from "react-icons/fa";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import useMessagesContext from "../hooks/useMessagesContext";
import DeletedMessagePreview from "../components/DeletedMessagePreview";

const MainLayout = () => {
	const { currentChannel } = useChannelsContext();
	const { deleteMessage, messageOnDeletion, setMessageOnDeletion } =
		useMessagesContext();
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
			{messageOnDeletion ? (
				<>
					<div className="fixed top-0 bottom-0 z-999">
						<div className="bg-neutral-950/50 flex min-h-screen max-h-screen min-w-screen max-w-screen justify-center items-center">
							<div className=" relative border flex flex-col border-neutral-800 bg-neutral-900 rounded-md text-white p-5 w-112 ">
								<div className="absolute top-5 right-5">
									<IoClose
										onClick={() => {
											setMessageOnDeletion(null);
										}}
										size={38}
										className=" text-neutral-300 cursor-pointer rounded-full p-2 hover:bg-neutral-800"
									/>
								</div>
								<div className="font-bold text-xl">
									Delete Message
								</div>
								<div className="text-neutral-300">
									You will be Deleting the Following message:
								</div>
								<div className="m-5">
									<DeletedMessagePreview
										message={messageOnDeletion}
									/>
								</div>
								<div className="flex justify-around">
									<div
										onClick={() => {
											deleteMessage(
												messageOnDeletion._id,
											);
											setMessageOnDeletion(null);
										}}
										className="py-2 px-10 cursor-pointer rounded-xl bg-danger-500 hover:bg-danger-600   border border-danger-500/80 "
									>
										{" "}
										Proceed
									</div>

									<div
										onClick={() => {
											setMessageOnDeletion(null);
										}}
										className="py-2 px-10 cursor-pointer rounded-xl bg-neutral-800/70 hover:bg-neutral-800/20 border border-neutral-800   "
									>
										{" "}
										Cancel
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				""
			)}
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
