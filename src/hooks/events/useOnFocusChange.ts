import { useRoundStore } from "@/shared/store/roundStore";
import { useEffect, useState } from "react";

export const useOnFocusChange = (callback: () => any) => {
    const roundId = useRoundStore(state => state.round?.id);
    const [savedRoundId, setSavedRoundId] = useState<Maybe<ID>>(null);

    useEffect(() => {
        if (!roundId) return;

        if (savedRoundId == null) {
            return setSavedRoundId(roundId);
        };

        callback()
    }, [roundId])
}