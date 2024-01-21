import { IVoting } from "@/types/entities/game/rounds/voting";
import { DatabaseRound, Round } from "@/types/entities/game/rounds";
import { parseQueueRound } from "./parseQueueRound";
import { parseBlitzRound } from "./parseBlitzRound";
import { useRoundStore } from "@/shared/store/roundStore";

export const parseRound = async (round: DatabaseRound): Promise<Maybe<Round>> => {
    // TODO: Make less reads for parsing. Use `cachedRound` to compare entities and do not parse them if they are already parsed
    const cachedRound = useRoundStore.getState().round;

    let parsedRound: Maybe<Round> = null;

    if (round.processType === 'queue') {
        parsedRound = await parseQueueRound(round);
    } else if (round.processType === 'blitz') {
        parsedRound = await parseBlitzRound(round);
    }

    if (!parsedRound) return null;

    return {
        ...parsedRound,
        voting: round.voting
    }
}