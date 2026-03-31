import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import MessagesProvider from "./providers/MessagesProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MessagesProvider>
			<App />
		</MessagesProvider>
	</StrictMode>,
);
