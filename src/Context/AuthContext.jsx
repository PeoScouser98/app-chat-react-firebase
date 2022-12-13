import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const unsubcribed = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { displayName, email, uid, photoURL } = user;
				setCurrentUser({ displayName, email, uid, photoURL });
				navigate("/");
			} else {
				setCurrentUser({});
				navigate("/login");
			}
		});
		return () => {
			unsubcribed();
		};
	}, []);

	return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
