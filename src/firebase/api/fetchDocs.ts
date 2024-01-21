import { collection, getDocs, query, QueryConstraint } from "firebase/firestore";
import { firestore } from "..";

export const fetchDocs = async <T>(collectionPath: string, ...queries: QueryConstraint[]): Promise<T[]> => {
    const collectionRef = collection(firestore, collectionPath);

    const snapshot = await getDocs(query(collectionRef, ...queries))

    return snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    } as T))
}