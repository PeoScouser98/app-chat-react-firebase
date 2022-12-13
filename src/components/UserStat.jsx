import React from "react";
import Avatar from "./Avatar";
import { useEffect } from "react";
import { db } from "../firebase/firebase.config";

const UserStat = (prop) => {
	const { stat, children } = prop;

	useEffect(() => {});
	return (
		<div className="flex items-center gap-4 relative">
			<Avatar imageUrl={stat?.photoURL} isOnline={stat?.status} />
			<div>
				<h3 className=" font-bold text-white">{stat?.username}</h3>
				{children}
			</div>
		</div>
	);
};

export default UserStat;
