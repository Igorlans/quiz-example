import { useRoundStore } from "@/shared/store/roundStore"
import { useEffect } from "react";

export const useOnRoundFinished = (callback: () => any) => {
    const round = useRoundStore(state => state.round);

    useEffect(() => {
        if (!round?.finished) return;

        callback();
    }, [round?.finished])
}