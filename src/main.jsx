import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppProvider from "./Context/AppContext";
import AuthProvider from "./Context/AuthContext";
import ChatProvider from "./Context/ChatContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
