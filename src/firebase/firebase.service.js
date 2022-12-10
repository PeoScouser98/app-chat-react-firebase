import { db, storage } from "./firebase.config";
import { collection, doc, setDoc, serverTimestamp, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const insertDocument = async (schema, data) => {
	try {
		const docRef = await addDoc(collection(db, schema), {
			...data,
			createdAt: serverTimestamp(),
		});
		console.log("New document:>>", docRef);
	} catch (error) {
		console.log(error);
	}
};

export const uploadFile = async (file) => {
	try {
		const storageRef = ref(storage, `/attachments/${file.name}`);

		const uploadTask = uploadBytesResumable(storageRef, file);
		const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
		console.log("image url:>>>", imageURL);
		return imageURL;

		// handle logic ...
	} catch (error) {
		console.log(error.message);
		// handle errors
	}
};

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName) => {
	// liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
	// => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
	const name = displayName.split(" ").filter((word) => word);

	const length = name.length;
	let flagArray = [];
	let result = [];
	let stringArray = [];

	/**
	 * khoi tao mang flag false
	 * dung de danh dau xem gia tri
	 * tai vi tri nay da duoc su dung
	 * hay chua
	 **/
	for (let i = 0; i < length; i++) {
		flagArray[i] = false;
	}

	const createKeywords = (name) => {
		const arrName = [];
		let curName = "";
		name.split("").forEach((letter) => {
			curName += letter;
			arrName.push(curName);
		});
		return arrName;
	};

	function findPermutation(k) {
		for (let i = 0; i < length; i++) {
			if (!flagArray[i]) {
				flagArray[i] = true;
				result[k] = name[i];

				if (k === length - 1) {
					stringArray.push(result.join(" "));
				}

				findPermutation(k + 1);
				flagArray[i] = false;
			}
		}
	}

	findPermutation(0);

	const keywords = stringArray.reduce((acc, cur) => {
		const words = createKeywords(cur);
		return [...acc, ...words];
	}, []);

	return keywords;
};
