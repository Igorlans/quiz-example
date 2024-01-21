import { useRoundStore } from "@/shared/store/roundStore";
import { useEffect, useState } from "react";

export const useIsCategoriesLoading = () => {
    const candidates = useRoundStore(state => state.round?.voting?.candidates);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

    useEffect(() => {
      setIsCategoriesLoading(!candidates?.length) 
    }, [candidates])

    return isCategoriesLoading;
}