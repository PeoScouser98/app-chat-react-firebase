import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
	const currentUser = useContext(AuthContext);

	const chatReducer = (state, action) => {
		switch (action.type) {
			case "CHANGE_USER":
				console.log(action.payload);
				return {
					user: action.payload.user,
					chatId:
						currentUser.uid > action.payload.user.uid
							? currentUser.uid + "_&_" + action.payload.user.uid
							: action.payload.user.uid + "_&_" + currentUser.uid,
				};

			default:
				return state;
		}
	};

	const [chatState, dispatch] = useReducer(chatReducer, {
		chatId: null,
		user: null,
	});
	console.log(chatState);
	return <ChatContext.Provider value={{ chatState, dispatch }}>{children}</ChatContext.Provider>;
};

export { ChatContext };
export default ChatProvider;
