import { useContext } from "react";
import { MessagesContext } from "../providers/MessagesProvider";

const useMessagesContext = () => {
	const context = useContext(MessagesContext);
	if (!context) throw new Error("Must be inside MessagesProvider!");

	return context;
};

export default useMessagesContext;
