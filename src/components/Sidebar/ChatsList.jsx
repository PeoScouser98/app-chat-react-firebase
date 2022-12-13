import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import app, { db } from "../../firebase/firebase.config";
import UserStat from "../UserStat";
import firebase from "firebase/compat";
// import { db } from "../../firebase/firebase.config";

const ChatsList = () => {
	const [chatsList, setChatsList] = useState([]);
	const currentUser = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);
	useEffect(() => {
		// const _query = query(collection(db,'userChats'),where(''))
		const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
			setChatsList(doc.data());
		});
		return () => {
			unsub();
		};
	}, []);

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
			{typeof chatsList === "object" &&
				Object.entries(chatsList)?.map((chat) => {
					return (
						<li onClick={() => selectChat(chat)} key={chat[0]}>
							<UserStat stat={{ username: chat[1].userInfo.displayName, photoURL: chat[1].userInfo.photoURL }}>
								<span>{chat[1].lastestMessage?.message}</span>
								<span className="badge badge-info absolute top-1/2 right-2 -translate-y-1/2 text-neutral font-bold">
									1
								</span>
							</UserStat>
						</li>
					);
				})}
		</ul>
	);
};

export default ChatsList;
