import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import VideoCallProvider from "./Context/VideoContext";
import AuthProvider, { AuthContext } from "./Context/AuthContext";
import ChatProvider from "./Context/ChatContext";
import "./index.css";
import ChatWindow from "./pages";
import Login from "./pages/Login";

const ProtectedPage = ({ children }) => {
	const auth = useContext(AuthContext);
	return Object.keys(auth).length === 0 ? <Navigate to="/login" /> : children;
};

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ChatProvider>
					<VideoCallProvider>
						<Routes>
							<Route
								path="/"
								element={
									<ProtectedPage>
										<ChatWindow />
									</ProtectedPage>
								}
							/>
							<Route path="/login" element={<Login />} />
						</Routes>
					</VideoCallProvider>
				</ChatProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
