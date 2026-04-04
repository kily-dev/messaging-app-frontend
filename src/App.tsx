import React from "react";
import MessageList from "./components/MessageList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route path="channel/:id" element={<MessageList />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
