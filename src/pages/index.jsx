import { useContext } from "react";
import tw from "tailwind-styled-components";
import ChatBox from "../components/Chatbox";
import ChatInput from "../components/Chatbox/ChatForm";
import Header from "../components/Header/index";
import Hero from "../components/Hero";
import VideoCallModal from "../components/Modals/VideoCallModal";
import Sidebar from "../components/Sidebar/index";
import { ChatContext } from "../Context/ChatContext";
import { VideoCallContext } from "../Context/VideoContext";
// * styled components
const DrawerWrapper = tw.div`drawer drawer-mobile`;
const DrawerContent = tw.div`drawer-content h-screen flex flex-col justify-between items-stretch overflow-x-hidden`;
const DrawerToggle = tw.input`drawer-toggle`;

const ChatWindow = () => {
	const { chatState } = useContext(ChatContext);
	const { videoState } = useContext(VideoCallContext);
	return (
		<DrawerWrapper data-theme="dark">
			<DrawerToggle id="sidebar-toggle" type="checkbox" />
			<DrawerContent>
				{chatState.chatId === null ? (
					<Hero />
				) : (
					<>
						<Header />
						<ChatBox />
						<ChatInput />
					</>
				)}
			</DrawerContent>
			<Sidebar />
			{videoState && <VideoCallModal />}
			{/* <CreateRoomModal /> */}
		</DrawerWrapper>
	);
};

export default ChatWindow;
