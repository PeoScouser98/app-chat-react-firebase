import React, { useContext } from "react";
import RoomList from "./RoomList";
import UserControl from "./UserControl";
import tw from "tailwind-styled-components";
import Search from "./Search";
import ChatsList from "./ChatsList";

const DrawerSide = tw.aside`drawer-side `;
const DrawerOverlay = tw.label`drawer-overlay`;
const DrawerSideMenu = tw.div`menu p-4 w-80 bg-neutral text-base-content`;
const Sidebar = () => {
	return (
		<DrawerSide>
			<DrawerOverlay htmlFor="sidebar-toggle"></DrawerOverlay>
			<DrawerSideMenu>
				<UserControl />
				<Search />
				{/* <RoomList /> */}
				<ChatsList />
			</DrawerSideMenu>
		</DrawerSide>
	);
};

export default Sidebar;
