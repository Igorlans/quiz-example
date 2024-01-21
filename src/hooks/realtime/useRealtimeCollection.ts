import { firestore } from '@/firebase';
import {
	QueryConstraint,
	Unsubscribe,
	collection,
	onSnapshot,
	query,
} from 'firebase/firestore';
import { useCallback, useRef, useState } from 'react';

export function useRealtimeCollection<T>(collectionPath: string) {
	const [documents, setDocuments] = useState<T[]>([]);
	const unsubscribeRef = useRef<Unsubscribe>();

	const subscribe = useCallback(
		
		(...queries: Maybe<QueryConstraint>[]) => {
			const documentsCollection = collection(firestore, collectionPath);
			const documentsQuery = query(
				documentsCollection,
				...(queries?.filter((query) => query) as QueryConstraint[])
			);

			// unsubscribing from the last subscribe
			unsubscribeRef.current?.();

			const unsubscribe = onSnapshot(documentsQuery, (snapshot) => {
				const updatedDocuments = snapshot.docs
					.map(
						(doc) =>
							({
								...doc.data(),
								id: doc.id,
							} as T)
					)
					.filter((document) => document != null);

				setDocuments(updatedDocuments);
			});
			const date = new Date()

			unsubscribeRef.current = unsubscribe

			return unsubscribe;
		},
		[collectionPath]
	);

	return { documents, subscribe };
}
