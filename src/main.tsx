import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import MessagesProvider from "./providers/MessagesProvider.tsx";
import ChannelsProvider from "./providers/ChannelsProvider.tsx";
import "./index.css";
import UsersProvider from "./providers/UsersProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UsersProvider>
			<ChannelsProvider>
				<MessagesProvider>
					<App />
				</MessagesProvider>
			</ChannelsProvider>
		</UsersProvider>
	</StrictMode>,
);
