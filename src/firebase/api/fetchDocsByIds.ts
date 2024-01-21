import { devideArrayToChunks } from '@/shared/utils/devideArrayToChunks';

import { collection, documentId, getDocs, query, where } from "firebase/firestore";
import { firestore } from "..";


// Usage: pass array of IDs of elements from one collection as 1 argument and path to that collection as a second argument
// Pass generic type as a return type of this function
// ! Returns elemenets in sorted by ID order
export const fetchDocsByIds = async <T extends object>(ids: ID[], collectionPath: string): Promise<T[]> => {
    const result: T[] = [];

    // The limit for 'in' query is 10 documents so devide array to chunks 
    const chunkedIds = devideArrayToChunks(ids, 10);

    const queries = chunkedIds.map(chunk => {
        return query(collection(firestore, collectionPath), where(documentId(), 'in', chunk));
    })

    const documents = (await Promise.all(
        queries.map(async (query) => {
            return (await getDocs(query)).docs;
        })
    ))
    .flat()
    
    documents.forEach(document => {
        const data = document.data() as Maybe<Omit<T, 'id'>>;

        if (!data) return;

        result.push({
            ...data,
            id: document.id
        } as T)
    })

    return result;
}
