import React from "react";

export const Avatar = ({ photoURL, counter }) => {
	if (photoURL)
		return (
			<div className="avatar">
				<div className="w-10">
					<img src={photoURL} className="rounded-full" />
				</div>
			</div>
		);
	if (counter)
		return (
			<div className="avatar placeholder">
				<div className="w-10 bg-neutral-focus text-neutral-content">
					<span>+ {counter}</span>
				</div>
			</div>
		);
};

export default Avatar;
