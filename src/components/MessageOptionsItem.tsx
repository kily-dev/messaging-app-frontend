import React from "react";

interface Props {
	icon: React.ReactNode;
	hoverColor: string;
	onClick: () => void;
}

const MessageOptionsItem = ({ icon, onClick, hoverColor }: Props) => {
	return (
		<div
			onClick={onClick}
			className={`text-neutral-500 hover:text-neutral-200 ${hoverColor === "danger" ? "hover:bg-danger-800/30" : "hover:bg-neutral-800"} p-1 rounded-md cursor-pointer `}
		>
			{icon}
		</div>
	);
};

export default MessageOptionsItem;
