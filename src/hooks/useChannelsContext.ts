import { useContext } from "react";
import { ChannelsContext } from "../providers/ChannelsProvider";

const useChannelsContext = () => {
	const context = useContext(ChannelsContext);
	if (!context) throw new Error("Must be inside Channels Provider!");
	return context;
};

export default useChannelsContext;
