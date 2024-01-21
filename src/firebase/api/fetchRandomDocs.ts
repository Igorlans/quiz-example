
import { getRandomArrayElements } from "@/shared/utils/getRandomArrayElements";
import { QueryConstraint } from "firebase/firestore";
import { fetchDocs } from "./fetchDocs";


// TODO: implement improved random fetching logic `https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection`

/**
 * @param path Path to the collection of documents
 * 
 * @param count How many documents return
 * 
 * @param queries Queries to shorten fetched docs. Accepts `null` queries and then filters them to be only valid queries. It is made to pass queries conditionally
 * 
 * @returns `count` of random elements from `path` collection
 */
export const fetchRandomDocs = async <T>(collectionPath: string, count: number, ...queries: Maybe<QueryConstraint>[]): Promise<T[]> => {
    const elements = await fetchDocs<T>(collectionPath, ...queries.filter(query => query) as QueryConstraint[]);

    return getRandomArrayElements(elements, count);
}