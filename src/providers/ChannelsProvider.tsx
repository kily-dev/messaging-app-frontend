import { createContext, type ReactNode } from "react";
import useChannels from "../hooks/useChannels";

type ChannelsContextType = ReturnType<typeof useChannels>;

export const ChannelsContext = createContext<ChannelsContextType | null>(null);

interface Props {
	children: ReactNode;
}

const ChannelsProvider = ({ children }: Props) => {
	const value = useChannels();
	return (
		<ChannelsContext.Provider value={value}>
			{children}
		</ChannelsContext.Provider>
	);
};

export default ChannelsProvider;
