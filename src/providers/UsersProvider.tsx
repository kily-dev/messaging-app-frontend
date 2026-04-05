import { createContext, type ReactNode } from "react";
import useUsers from "../hooks/useUsers";

type UserContextType = ReturnType<typeof useUsers>;

export const UserContext = createContext<UserContextType | null>(null);

interface Props {
	children: ReactNode;
}

const UsersProvider = ({ children }: Props) => {
	const value = useUsers();
	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};

export default UsersProvider;
