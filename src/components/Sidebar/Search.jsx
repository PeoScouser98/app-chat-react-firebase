import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import _debounce from "lodash/debounce";
import { useContext, useState } from "react";
import { BsChatSquareText, BsSearch } from "react-icons/bs";
import { db } from "../../firebase/firebase.config";

import { AuthContext } from "../../Context/AuthContext";
import Avatar from "../Avatar";
import Loading from "../Loading";

import tw from "tailwind-styled-components";
import { ChatContext } from "../../Context/ChatContext";

const SearchControl = tw.div`flex justify-start items-center gap-4 bg-base-200 px-4 py-2 rounded-md relative`;
const SearchInput = tw.input`input input-sm focus:outline-none bg-inherit flex-1 px-0`;
const SearchResults = tw.ul`dropdown-content menu shadow w-full absolute mt-1 rounded-md bg-base-100`;

const Search = () => {
	const currentUser = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);
	const [searchResult, setSearchResult] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const findUser = _debounce(async (e) => {
		setIsFetching(true);
		const q = query(collection(db, "users"), where("keywords", "array-contains", e.target.value), limit(20));
		const querySnapshot = await getDocs(q);
		let users = querySnapshot.docs.map((doc) => doc.data());
		users = users.filter((u) => u.uid !== currentUser.uid);

		setSearchResult(users);
		setTimeout(() => {
			setIsFetching(false);
		}, 500);
	}, 1000);

	const handleSelect = async (user) => {
		try {
			// * id cuộc trò chuyện giữa 2 ng
			const combineId =
				currentUser.uid > user.uid ? currentUser.uid + "_&_" + user.uid : user.uid + "_&_" + currentUser.uid;

			const res = await getDoc(doc(db, "chats", combineId));
			dispatch({
				type: "CHANGE_USER",
				payload: {
					chatId: combineId,
					user: user,
				},
			});

			// * check nếu người dùng đã chọn chưa có cuộc hội thoại nào -> tạo mới
			if (!res.exists()) {
				await setDoc(doc(db, "chats", combineId), { messages: [] }); // * tạo đoạn chat mới
				// * tạo đoạn chat cho ng dùng hiện tại
				await updateDoc(doc(db, "userChats", currentUser.uid), {
					[combineId + ".userInfo"]: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					[combineId + ".date"]: serverTimestamp(),
				});
				// * tạo đoạn chat tạo đoạn chat cho người đã chọn
				await updateDoc(doc(db, "userChats", user.uid), {
					[combineId + ".userInfo"]: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					},
					[combineId + ".date"]: serverTimestamp(),
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="dropdown mb-6">
			<SearchControl tabIndex={0}>
				<div className="w-4">{isFetching ? <Loading /> : <BsSearch className="text-lg" />}</div>
				<SearchInput type="search" placeholder="Find an user ..." onChange={(e) => findUser(e)} />
			</SearchControl>
			<SearchResults tabIndex={0}>
				{searchResult.map((user, index) => {
					return (
						<li onClick={() => handleSelect(user)} key={index}>
							<div className="flex justify-between items-center gap-5">
								<div className="flex items-center gap-3">
									<Avatar style={{ width: "32px", height: "32px" }} imageUrl={user.photoURL} isOnline={true} />
									<h3>{user.displayName}</h3>
								</div>
								<BsChatSquareText className="text-lg" />
							</div>
						</li>
					);
				})}
			</SearchResults>
		</div>
	);
};

export default Search;
