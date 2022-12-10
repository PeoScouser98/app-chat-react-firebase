import { collection, getDocs, doc, onSnapshot, query } from "firebase/firestore";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../firebase/firebase.config";
import Avatar from "../Avatar";
import UserInfo from "../UserInfo";

const ChatsList = () => {
	const [chatsList, setChatsList] = useState([]);
	const [isSelected, setSelected] = useState(false);
	const currentUser = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);
	useEffect(() => {
		// const _query = query(collection(db,'userChats'),where(''))
		const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
			setChatsList(Object.entries(doc.data()));
		});
		return () => {
			unsub();
		};
	}, []);
	// console.log(users);

	const selectChat = async (chat) => {
		try {
			dispatch({
				type: "CHANGE_USER",
				payload: {
					chatId: chat[0],
					user: chat[1].userInfo,
				},
			});
			// handle logic ...
		} catch (error) {
			// handle errors
		}
	};
	return (
		<ul className="menu">
			{chatsList.map((chat) => (
				<li onClick={() => selectChat(chat)} key={chat[0]}>
					<UserInfo photoUrl={chat[1].userInfo.photoURL} username={chat[1].userInfo.displayName}>
						<span>Last message</span>
					</UserInfo>
				</li>
			))}
		</ul>
	);
};

export default ChatsList;
