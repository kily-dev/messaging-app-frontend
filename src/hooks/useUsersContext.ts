import React, { createContext, useContext } from "react";
import { UserContext } from "../providers/UsersProvider";

const useUsersContext = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error("Must be inside UsersProvider!");
	return context;
};

export default useUsersContext;
