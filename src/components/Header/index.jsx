import { useContext } from "react";
import { BsPersonPlus } from "react-icons/bs";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import tw from "tailwind-styled-components";
import { ChatContext } from "../../Context/ChatContext";
import Tooltip from "../Tooltip";
import UserStat from "../UserStat";
import VideoCallButton from "./VideoCallButton";

export const DrawerToggleLabel = tw.label`btn btn-primary drawer-button hidden sm:inline-flex md:inline-flex btn-ghost text-lg`;
const Button = tw.button`btn btn-square btn-ghost text-xl font-semibold`;
const Header = tw.header`flex justify-between items-center px-4 py-3 bg-base-300 shadow-xl`;

const ChatHeader = () => {
	const { chatState } = useContext(ChatContext);

	return (
		<>
			{/* <VideoCallModal videoRef={currentUserVideoRef} peerId={remotePeerIdValue} callOff={endCall} /> */}
			<Header>
				<UserStat stat={{ photoURL: chatState?.user?.photoURL, username: chatState.user?.displayName }}>
					<span>Online</span>
				</UserStat>

				<div>
					<VideoCallButton />
					<Tooltip tooltipProps={{ dataTip: "Add friend", position: "tooltip-bottom" }}>
						<Button aria-hidden>
							<BsPersonPlus />
						</Button>
					</Tooltip>
					<DrawerToggleLabel htmlFor="sidebar-toggle">
						<HiOutlineBars3CenterLeft />
					</DrawerToggleLabel>
				</div>
			</Header>
		</>
	);
};

export default ChatHeader;
