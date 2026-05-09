import React from "react";

interface Props {
	icon: React.ReactNode;
	onClick: () => void;
}

const TopBarButton = ({ icon, onClick }: Props) => {
	return (
		<div
			onClick={onClick}
			className="text-neutral-500 hover:text-neutral-200 cursor-pointer "
		>
			{icon}
		</div>
	);
};

export default TopBarButton;
