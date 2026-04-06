import { io } from "socket.io-client";

export const socket = io("http://localhost:3000/", {
	auth: {
		sessionId: localStorage.getItem("sessionId"),
	},
});

socket.on("connect", () => {
	console.log("Successfully connected to: ", socket.id);
});

socket.on("disconnect", () => {
	console.log("Disconnected from: ", socket.id);
});
