import { QueryConstraint, collection, getDocs, query, writeBatch } from "firebase/firestore";
import { firestore } from "..";

export const deleteMany = async (collectionPath: string, ...docQueries: Maybe<QueryConstraint>[]) => {
    const batch = writeBatch(firestore);
    const validDocQueries = docQueries.filter(query => query) as QueryConstraint[];

    const collectionRef = collection(firestore, collectionPath);
    const q = query(collectionRef, ...validDocQueries);
    const docs = await getDocs(q);

    docs.forEach(docSnapshot => {
        batch.delete(docSnapshot.ref)
    })

    await batch.commit();
}