import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../firebase/firebase.config";
import ChatBubble from "./ChatBubble";
import tw from "tailwind-styled-components";

const ChatsContainer = tw.div`flex flex-col justify-start gap-3 overflow-y-scroll scroll p-8 h-full`;
// const messages = [
// 	{
// 		text: "message",
// 		displayName: "user",
// 		createdAt: new Date().toLocaleTimeString(),
// 		isCurrentUser: true,
// 		photoURL: "https://placeimg.com/192/192/people",
// 	},
// 	{
// 		text: "message",
// 		displayName: "user",
// 		createdAt: new Date().toLocaleTimeString(),
// 		isCurrentUser: true,
// 		photoURL: "https://placeimg.com/192/192/people",
// 	},
// 	{
// 		text: "message",
// 		displayName: "user",
// 		createdAt: new Date().toLocaleTimeString(),
// 		isCurrentUser: true,
// 		photoURL: "https://placeimg.com/192/192/people",
// 	},
// 	{
// 		text: "ok nuôn!",
// 		displayName: "user",
// 		createdAt: new Date().toLocaleTimeString(),
// 		isCurrentUser: false,
// 		photoURL: "https://placeimg.com/192/192/people",
// 	},
// 	{
// 		text: "Đẳng's cấp",
// 		displayName: "user",
// 		createdAt: new Date().toLocaleTimeString(),
// 		isCurrentUser: false,
// 		photoURL: "https://placeimg.com/192/192/people",
// 	},
// 	{
// 		text: "xin chào",
// 		displayName: "user",
// 		createdAt: new Date().toLocaleTimeString(),
// 		photoURL: "https://placeimg.com/192/192/people",
// 		isCurrentUser: true,
// 	},
// 	{
// 		text: "ahhiiihihihihi",
// 		displayName: "user",
// 		createdAt: new Date().toLocaleTimeString(),
// 		isCurrentUser: true,
// 		photoURL: "https://placeimg.com/192/192/people",
// 	},
// ];

const ChatBox = () => {
	const [messages, setMessages] = useState([]);
	// * lấy ra chat id của đoạn chat hiện tại|
	const { chatState } = useContext(ChatContext);
	console.log("chat state:>>", chatState);
	useEffect(() => {
		if (chatState?.chatId !== null) {
			console.log(chatState.chatId);

			const unsub = onSnapshot(doc(db, "chats", chatState?.chatId), (doc) => {
				doc.exists() && setMessages(doc.data().messages);
			});

			return () => {
				unsub();
			};
		}
	}, [chatState]);
	console.log("messages:>>>", messages);
	return (
		<ChatsContainer>
			{Array.isArray(messages) && messages?.map((msg, index) => <ChatBubble messageData={msg} key={index} />)}
		</ChatsContainer>
	);
};

export default ChatBox;
