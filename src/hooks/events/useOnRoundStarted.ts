import { useRoundStore } from "@/shared/store/roundStore"
import { useEffect } from "react";

export const useOnRoundStarted = (callback: () => any) => {
    const round = useRoundStore(state => state.round);

    useEffect(() => {
        if (!round?.started) return;

        callback();
    }, [round?.started])
}