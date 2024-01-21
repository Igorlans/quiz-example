import { firestore } from "@/firebase";
import { DocumentData, DocumentSnapshot, Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export const useRealtimeDocument = <T extends { id: ID}>(path: Maybe<string>) => {
    const [document, setDocument] = useState<T>();
    const [snapshot, setSnapshot] = useState<DocumentSnapshot<DocumentData>>();
    const [exists, setExists] = useState<Maybe<boolean>>(null);
    const unsubscribeRef = useRef<Unsubscribe>();

    useEffect(() => {
        if (!path) return;

        // Unsubscribing last subscription
        unsubscribeRef.current?.();
        
        const documentRef = doc(firestore, path);
        const unsubscribe = onSnapshot(documentRef, (snapshot) => {
            if (!snapshot.exists()) {
                console.error(`Document with path "${path}" does not exist`)
                setExists(false);
                return null;
            }
            
            const documentData = { ...snapshot.data(), id: snapshot.id } as T;
            
            setExists(true);
            setSnapshot(snapshot);
            setDocument(documentData);
        })
        
        unsubscribeRef.current = unsubscribe;
        return unsubscribe;
    }, [path])

    return { document, snapshot, exists };
}
