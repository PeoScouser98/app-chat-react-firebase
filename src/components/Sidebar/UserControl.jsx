import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../../Context/AuthContext";
import UserStat from "../UserStat";

import { auth } from "/src/firebase/firebase.config";

const UserControl = () => {
	const user = useContext(AuthContext);
	const signout = () => {
		auth.signOut();
	};
	return (
		<div className="flex justify-between items-center h-fit px-0 mb-10">
			<UserStat stat={{ photoURL: user?.photoURL, username: user?.displayName, status: true }}>
				<span>Online</span>
			</UserStat>

			<div className="tooltip tooltip-bottom tooltip-primary" data-tip="Sign out">
				<button className="btn btn-ghost text-xl" onClick={signout}>
					<CiLogout />
				</button>
			</div>
		</div>
	);
};

export default UserControl;
