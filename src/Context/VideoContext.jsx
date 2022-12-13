import { useReducer } from "react";
import { createContext, useState } from "react";

const reducer = (state, action) => {
	switch (action.type) {
		case "JOINED":
			state = action.payload;
			return state;
		case "LEFT":
			state = action.payload;
			return state;
		default:
			state = false;
			return state;
	}
};

const VideoCallContext = createContext({});
const VideoCallProvider = ({ children }) => {
	const [videoState, dispatch] = useReducer(reducer, false);
	return <VideoCallContext.Provider value={{ videoState, dispatch }}>{children}</VideoCallContext.Provider>;
};

export { VideoCallContext };
export default VideoCallProvider;
