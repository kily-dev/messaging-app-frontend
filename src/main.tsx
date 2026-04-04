import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import MessagesProvider from "./providers/MessagesProvider.tsx";
import ChannelsProvider from "./providers/ChannelsProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ChannelsProvider>
			<MessagesProvider>
				<App />
			</MessagesProvider>
		</ChannelsProvider>
	</StrictMode>,
);
