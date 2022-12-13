import React from "react";
import tw from "tailwind-styled-components";

const Tooltip = (data) => {
	const { dataTip, position, style } = data.tooltipProps;
	// console.log(dataTip);
	return (
		<div className={`tooltip z-50 ${position || ""}`} data-tip={dataTip}>
			{data.children}
		</div>
	);
};

export default Tooltip;
