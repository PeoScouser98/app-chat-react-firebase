import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { MdCallEnd } from "react-icons/md";
import client, { APP_ID, TOKEN, CHANNEL } from "../../configs/agora";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoCallContext } from "../../Context/VideoContext";
import tw from "tailwind-styled-components";
import { useRef } from "react";

const Modal = tw.div`modal `;
const ModalToggler = tw.input`modal-toggle`;
const ModalBox = tw.div`modal-box max-w-3xl h-fit`;
const ModalActions = tw.div`modal-action justify-center`;
const ModalButton = tw.button`btn  text-2xl font-bold w-16`;

const VideoCallModal = () => {
	const [users, setUsers] = useState([]);
	const videoCallData = useContext(VideoCallContext);
	const userRef = useRef();

	useEffect(() => {
		client.on("user-published", handleUserJoined);
		client.on("user-left", handleUserLeft);
		(async () => {
			const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);
			const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
			const [audioTrack, videoTrack] = tracks;

			setUsers((prev) => [...prev, { uid, videoTrack, audioTrack }]);
			client.publish(tracks);
			console.log(users);

			// handle logic ...
		})();
	}, []);
	console.log(users);
	users[0]?.videoTrack?.play(userRef.current);
	// useEffect(() => {
	// 	console.log(users);
	// });

	const handleUserJoined = () => {};
	const handleUserLeft = () => {};

	return (
		<>
			<ModalToggler type="checkbox" id="video-call-modal" />
			<Modal>
				<ModalBox>
					<div className="rounded-2xl w-80 h-80" ref={userRef}></div>

					<ModalActions>
						<ModalButton
							className="btn-error"
							onClick={() => videoCallData?.dispatch({ type: "LEFT", payload: false })}
						>
							<MdCallEnd />
						</ModalButton>
					</ModalActions>
				</ModalBox>
			</Modal>
		</>
	);
};

export default VideoCallModal;
