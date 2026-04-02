import { io } from "socket.io-client";

export const socket = io("http://localhost:3000/");

socket.on("connect", () => {
	console.log("Successfully connected to: ", socket.id);
});

socket.on("disconnect", () => {
	console.log("Disconnected from: ", socket.id);
});
