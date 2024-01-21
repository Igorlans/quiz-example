import { COLLECTIONS } from "@/constants/collections";

export const buildGamePath = (pathSegments: Maybe<ID>[]): string => {
    const path: string[] = [];
    let broken = false;
    
    pathSegments.forEach((segment, index) => {  
        if (!segment) return broken = true;
        if (broken) return;

        if (index === 0) {
            path.push(COLLECTIONS.GAME, segment);
        } 
        if (index === 1) {
            path.push(COLLECTIONS.TOUR, segment);
        }
        if (index === 2) {
            path.push(COLLECTIONS.ROUND, segment);
        }
    })

    return path.join('/');
}