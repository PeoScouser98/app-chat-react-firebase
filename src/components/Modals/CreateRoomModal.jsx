import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { BiGridSmall } from "react-icons/bi";
// import tw from "tailwind-styled-components";
import { AuthContext } from "../../Context/AuthContext";
import { insertDocument } from "../../firebase/firebase.service";

const CreateRoomModal = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
		setFocus,
	} = useForm();
	const [modalVisibility, setModalVisibility] = useState(false);

	const auth = useContext(AuthContext);

	const onSubmit = (data) => {
		/**
		 *
		 */
		console.log(auth);
		insertDocument("rooms", { ...data, members: [auth.uid] });
		setModalVisibility(false);
		return toast.success("Created a new chat room!");
	};

	const handleCloseModal = () => {
		setErrorMessage({});
		reset({ name: "" });
	};

	const [errorMessages, setErrorMessage] = useState(errors);

	return (
		<>
			<input type="checkbox" id="create-room-modal" className="modal-toggle" />
			<div className="modal sm:modal-middle">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center mb-5">Create new chat room</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="form-control gap-1 mb-6">
							<label htmlFor="" className="font-medium after:[content:'*'] after:text-error after:px-2">
								Room's name
							</label>
							<input
								type="text"
								className="input input-bordered w-[-webkit-fill-available]"
								placeholder="Type your room's name ..."
								autoFocus
								{...register("name", { required: true })}
							/>
							{errorMessages.name && <small className="error-message">Provide room's name!</small>}
						</div>

						<div className="modal-action">
							<label htmlFor="create-room-modal" className="btn btn-ghost" onClick={handleCloseModal}>
								Cancel
							</label>
							<button type="submit" className="btn btn-primary">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateRoomModal;
