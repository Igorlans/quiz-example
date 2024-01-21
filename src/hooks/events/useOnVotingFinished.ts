import { useRoundStore } from "@/shared/store/roundStore"
import { useEffect } from "react";

export const useOnVotingFinished = (callback: () => any) => {
    const round = useRoundStore(state => state.round);

    useEffect(() => {
        if (!round?.voting?.finished) return;

        callback();
    }, [round?.voting?.finished])
}