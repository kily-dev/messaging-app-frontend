import { SiSpeedypage } from "react-icons/si";

const NavBar = () => {
	return (
		<div>
			<div className="text-primary-400 justify-center items-center flex font-bold text-2xl">
				<SiSpeedypage />
				<div className="ml-2">Schnell</div>
			</div>
		</div>
	);
};

export default NavBar;
