import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../../Context/AuthContext";
import UserInfo from "../UserInfo";

import { auth } from "/src/firebase/firebase.config";

const UserControl = () => {
	const user = useContext(AuthContext);
	const signout = () => {
		auth.signOut();
	};
	return (
		<div className="flex justify-between items-center h-fit px-0 mb-10">
			<UserInfo photoUrl={user?.photoURL} username={user?.displayName} text="online" status={true} />

			<div className="tooltip tooltip-bottom tooltip-primary" data-tip="Sign out">
				<button className="btn btn-ghost text-xl" onClick={signout}>
					<CiLogout />
				</button>
			</div>
		</div>
	);
};

export default UserControl;
