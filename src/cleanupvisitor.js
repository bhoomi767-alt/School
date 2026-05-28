import { db } from "./firebase";
import {
    collection,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc
} from "firebase/firestore";

export const cleanupVisitors = async() => {
    const q = query(
        collection(db, "visitors"),
        orderBy("timestamp", "desc")
    );

    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    const MAX = 10;

    if (docs.length > MAX) {
        const extra = docs.slice(MAX);

        extra.forEach(async(d) => {
            await deleteDoc(doc(db, "visitors", d.id));
        });
    }
};