import React, { useContext } from "react";
import Tooltip from "../Tooltip";
import tw from "tailwind-styled-components";
import { BsCameraVideo } from "react-icons/bs";
import { VideoCallContext } from "../../Context/VideoContext";

const LabelButton = tw.label`btn btn-square btn-ghost text-xl font-semibold`;

const VideoCallButton = () => {
	const videoCallData = useContext(VideoCallContext);

	return (
		<Tooltip tooltipProps={{ dataTip: "Video call", position: "tooltip-bottom" }}>
			<LabelButton
				htmlFor="video-call-modal"
				onClick={() => videoCallData?.dispatch({ type: "JOINED", payload: true })}
			>
				<BsCameraVideo />
			</LabelButton>
		</Tooltip>
	);
};

export default VideoCallButton;
