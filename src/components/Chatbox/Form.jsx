import { arrayUnion, Timestamp, updateDoc, doc } from "firebase/firestore";
import { useContext } from "react";
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
const ButtonGroup = tw.div`flex items-center gap-4 absolute top-1/2 right-4 -translate-y-1/2 text-xl text-base-content `;
const Form = tw.form`flex items-stretch relative p-1`;
const Input = tw.input`input input-bordered input-lg focus:outline-none focus:border-primary focus:border-2 flex-1`;

const PostMessageForm = () => {
	const { chatState } = useContext(ChatContext);
	const currentUser = useContext(AuthContext);
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const postMessage = async (formData) => {
		try {
			console.log(formData.file.length);
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
			reset();
			// handle logic ...
		} catch (error) {
			console.log(error.message);
			// handle errors
		}
	};
	return (
		<Form onSubmit={handleSubmit(postMessage)}>
			<Input placeholder="Write a message ..." {...register("message", { required: true })} />

			<ButtonGroup>
				<div className="tooltip" data-tip="Emoji">
					<button>
						<BsEmojiLaughing />
					</button>
				</div>
				<div className="tooltip" data-tip="Attach file">
					<input type="file" id="attachment" className="hidden" {...register("file")} />
					<label htmlFor="attachment">
						<ImAttachment />
					</label>
				</div>
				<div className="tooltip" data-tip="Send">
					<button type="submit">
						<BiPaperPlane />
					</button>
				</div>
			</ButtonGroup>
		</Form>
	);
};

export default PostMessageForm;
