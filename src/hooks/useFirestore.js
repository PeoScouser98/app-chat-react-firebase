import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase/firebase.config";
import { collection, query, limit, where, onSnapshot } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

// * query data from firestore
const useFirestore = (collectionName, condition) => {
	const [documents, setDocuments] = useState([]);
	useEffect(() => {
		let ref = query(collection(db, collectionName)); //  select the model need to execute query
		let _query = useFirestoreQuery([collectionName], ref, { subscribe: true });

		if (condition) {
			// *  if there is no compare value -> stop executing query
			if (!condition.value || condition.value.length === 0) {
				return;
			}
			// * exec query to get documents from firestore with condition
			ref = query(collection(db, collectionName), where(condition.fieldName, condition.operator, condition.value));
		}
		const snapshot = _query.data;

		console.log("snapshot:>>>", snapshot);
		// const unsubcribe = onSnapshot(doc(db, collectionName), (docs) => {
		// 	console.log(docs);
		// });

		// 	setDocuments(firestoreDocs);
		// });
		// return () => unsubcribe(documents); // * PASSED ✅
	}, [collectionName, condition]);
	// console.log("data from firestore:>>", documents);
	return documents;
};

export default useFirestore;
