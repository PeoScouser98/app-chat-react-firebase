import { createContext, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

const AppContext = createContext({});
const AppProvider = ({ children }) => {
	const auth = useContext(AuthContext);
	const [modalVisibility, setModalVisibility] = useState(false);

	// * save room query condition to memory until user switch to other accout
	// const roomsList = useFirestore("rooms", roomQueryCondition);
	// const chatsList = useFirestore("chats");
	return <AppContext.Provider value={{ modalVisibility, setModalVisibility }}>{children}</AppContext.Provider>;
};

export { AppContext };
export default AppProvider;
