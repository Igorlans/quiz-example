
import { DocumentData, DocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { firestore } from "..";

type FetchDocumentReturn<T> = {
    data: Maybe<T>
    snapshot: DocumentSnapshot<DocumentData>
}

export const fetchDocument = async <T extends {id: ID}>(path: string): Promise<FetchDocumentReturn<T>> => {
    const documentRef = doc(firestore, path);

    const snapshot = await getDoc(documentRef)

    const docData = snapshot.exists() ? {
        ...snapshot.data() as NoID<T>,
        id: snapshot.id
    } : null;

    return {data: docData as T, snapshot: snapshot }
}