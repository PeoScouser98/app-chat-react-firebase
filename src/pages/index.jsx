import { useContext } from "react";
import { Navigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import ChatBox from "../components/Chatbox";
import ChatInput from "../components/Chatbox/ChatForm";
import Default from "../components/Default";
import Header from "../components/Header";
import CreateRoomModal from "../components/Modals/CreateRoomModal";
import Sidebar from "../components/Sidebar/index";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
// * styled components
const DrawerWrapper = tw.div`drawer drawer-mobile`;
const DrawerContent = tw.div`drawer-content h-screen flex flex-col justify-between items-stretch`;
const DrawerToggle = tw.input`drawer-toggle`;

const ChatWindow = () => {
	const { chatState } = useContext(ChatContext);

	return (
		<DrawerWrapper data-theme="dark">
			<DrawerToggle id="sidebar-toggle" type="checkbox" />
			<DrawerContent>
				{chatState.chatId === null ? (
					<Default />
				) : (
					<>
						<Header />
						<ChatBox />
						<ChatInput />
					</>
				)}
			</DrawerContent>
			<Sidebar />
			<CreateRoomModal />
		</DrawerWrapper>
	);
};

export default ChatWindow;
