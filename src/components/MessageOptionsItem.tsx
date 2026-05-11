import React from "react";

interface Props {
	icon: React.ReactNode;
	onClick: () => void;
}

const MessageOptionsItem = ({ icon, onClick }: Props) => {
	return (
		<div
			onClick={onClick}
			className="text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800 p-1 rounded-md cursor-pointer "
		>
			{icon}
		</div>
	);
};

export default MessageOptionsItem;
