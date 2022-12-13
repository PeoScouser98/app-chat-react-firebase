import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { BiPaperPlane } from "react-icons/bi";
import { BsEmojiLaughing } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import tw from "tailwind-styled-components";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../firebase/firebase.config";
import { uploadFile } from "../../firebase/firebase.service";
import Tooltip from "../Tooltip";

const ButtonGroup = tw.div`flex items-center gap-4 absolute top-1/2 right-4 -translate-y-1/2 text-xl text-base-content `;
const Form = tw.form`flex items-stretch relative p-1`;
const Input = tw.input`input input-bordered align-middle input-lg focus:outline-none focus:border-primary focus:border-2 flex-1`;
// const Tooltip = tw.div`tooltip`;

const PostMessageForm = () => {
	const { chatState } = useContext(ChatContext);
	const currentUser = useContext(AuthContext);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const inputRef = useRef();

	const { ref } = register("message");

	// * select emoji
	const selectEmoji = ({ emoji }) => {
		inputRef.current.focus();

		// const start =subString() inputRef.current.value.
		inputRef.current.value += emoji;
		console.log(inputRef.current.value);
	};

	const postMessage = async (formData) => {
		try {
			// post message without attached file
			if (formData.file.length === 0) {
				await updateDoc(doc(db, "chats", chatState.chatId), {
					messages: arrayUnion({
						id: uuid(),
						message: formData.message,
						senderId: currentUser.uid,
						date: Timestamp.now(),
					}),
				});
				console.log(formData);
			}
			// upload image then -> post together text message
			else {
				console.log(formData.file);
				formData.file = await uploadFile(formData.file[0]);

				await updateDoc(doc(db, "chats", chatState.chatId), {
					messages: arrayUnion({
						id: uuid(),
						message: formData.message,
						attachment: formData.file,
						senderId: currentUser.uid,
						date: Timestamp.now(),
					}),
				});
			}

			await updateDoc(doc(db, "userChats", currentUser.uid), {
				[chatState.chatId + ".lastestMessage"]: {
					message: formData.message,
				},
				[chatState.chatId + ".date"]: serverTimestamp(),
			});

			reset();
			// handle logic ...
		} catch (error) {
			console.log(error.message);
			// handle errors
		}
	};
	return (
		<Form onSubmit={handleSubmit(postMessage)}>
			<Input
				placeholder="Write a message ..."
				{...register("message", { required: true })}
				ref={(e) => {
					ref(e);
					inputRef.current = e;
				}}
			></Input>

			<ButtonGroup>
				<Tooltip tooltipProps={{ dataTip: "Emoji" }}>
					<div className="dropdown dropdown-top dropdown-end">
						<label tabIndex={0}>
							<BsEmojiLaughing aria-hidden />
						</label>
						<div tabIndex={0} className="dropdown-content">
							<EmojiPicker onEmojiClick={selectEmoji} theme="dark" />
						</div>
					</div>
				</Tooltip>
				<Tooltip tooltipProps={{ dataTip: "Attach file" }}>
					<input type="file" id="attachment" className="hidden" {...register("file")} />
					<label htmlFor="attachment">
						<ImAttachment />
					</label>
				</Tooltip>
				<Tooltip tooltipProps={{ dataTip: "Send" }}>
					<button type="submit">
						<BiPaperPlane />
					</button>
				</Tooltip>
			</ButtonGroup>
		</Form>
	);
};

export default PostMessageForm;
