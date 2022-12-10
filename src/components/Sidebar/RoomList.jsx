import { useContext } from "react";
import { BsPlus } from "react-icons/bs";
import { AppContext } from "../../Context/AppContext";

const RoomList = () => {
	const { roomsList } = useContext(AppContext);
	console.log(roomsList);
	return (
		<div className="flex flex-col">
			<h3 className="font-medium text-xl mb-3 text-white">Rooms List</h3>
			<div className="flex flex-col mb-6">
				{Array.isArray(roomsList) &&
					roomsList.map((room, index) => (
						<div className="btn btn-ghost btn-block text-left justify-start" key={index}>
							{room.name}
						</div>
					))}
			</div>
			<label htmlFor="create-room-modal" className="btn gap-3 btn-primary btn-block">
				<BsPlus className="text-lg" /> Create new group chat{" "}
			</label>
		</div>
	);
};

export default RoomList;
