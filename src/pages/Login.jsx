// * firebase
import {
	signInWithPopup,
	FacebookAuthProvider,
	GoogleAuthProvider,
	getAdditionalUserInfo,
	linkWithPopup,
} from "firebase/auth";
import firebase, { db, auth } from "../firebase/firebase.config";
import { generateKeywords, insertDocument } from "../firebase/firebase.service";
import { doc, setDoc } from "firebase/firestore";

import tw from "tailwind-styled-components";
// * component
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import YahooLogo from "../assets/yahoo.svg";
import { async } from "@firebase/util";

// * google provider & facebook provider
const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();
// const fbProvider = new firebase.auth.FacebookAuthProvider();
// const ggProvider = new firebase.auth.GoogleAuthProvider();

// * styled components
const Hero = tw.div`hero min-h-screen bg-base-200`;
const HeroContent = tw.div`hero-content min-w-full sm:flex-col flex-row-reverse`;
const CardBody = tw.div`card-body`;
const Card = tw.div`card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100`;
const Button = tw.button`btn gap-2`;

const createNewUserChat = async (user) => {
	const newChatDocRef = await setDoc(doc(db, "userChats", user.uid), {});
	console.log("New chat:>>", newChatDocRef);
};

const createNewUser = async (userDetails, user) => {
	const newDoc = await setDoc(doc(db, "users", user.uid), {
		displayName: user.displayName,
		email: user.email,
		photoURL: user.photoURL,
		uid: user.uid,
		providerId: userDetails.providerId,

		keywords: generateKeywords(user.displayName.toLowerCase()),
	});
	console.log("New document:>> ", newDoc);
};

const Login = () => {
	const handleFbLogin = async () => {
		try {
			const userCredential = await signInWithPopup(auth, fbProvider);
			console.log(userCredential);
			const { user } = userCredential;

			// * if this is the first time user login to app -> save user infor to firebase cloud
			const userDetails = getAdditionalUserInfo(userCredential);
			console.log(userDetails);
			if (userDetails?.isNewUser) {
				await createNewUser(userDetails, user);
				await createNewUserChat(user);
			}
		} catch (error) {}
	};
	const handleGgLogin = async () => {
		try {
			const userCredential = await signInWithPopup(auth, ggProvider);
			const { user } = userCredential;
			// * if this is the first time user login to app -> save user infor to firebase cloud
			const userDetails = getAdditionalUserInfo(userCredential);
			// * if this is the first time user login to app -> save user infor to firebase cloud
			if (userDetails?.isNewUser) {
				await createNewUser(userDetails, user);
				await createNewUserChat(user);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Hero>
			<HeroContent>
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login now!</h1>
					<p className="py-6 text-xl">
						Create account for free. Chat with your friend anytime, anywhere. <br /> Connecting people around the world!
					</p>
				</div>
				<Card>
					<CardBody>
						<img src={YahooLogo} alt="" className="max-w-[192px] object-cover mx-auto" />
						<div className="divider">Login with</div>
						<Button onClick={handleFbLogin}>
							<ImFacebook2 className="text-[#4267B2]" /> Facebook account
						</Button>
						<Button onClick={handleGgLogin}>
							<FcGoogle /> Google account
						</Button>
					</CardBody>
				</Card>
			</HeroContent>
		</Hero>
	);
};

export default Login;
