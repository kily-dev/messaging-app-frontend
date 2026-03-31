import React, { createContext, type ReactNode } from "react";
import useMessages from "../hooks/useMessages";

type MessagesContextType = ReturnType<typeof useMessages>;

export const MessagesContext = createContext<MessagesContextType | null>(null);

interface Props {
	children: ReactNode;
}

const MessagesProvider = ({ children }: Props) => {
	const value = useMessages();
	return (
		<MessagesContext.Provider value={value}>
			{children}
		</MessagesContext.Provider>
	);
};

export default MessagesProvider;
