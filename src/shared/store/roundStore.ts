import { firestore } from "@/firebase";
import { vote } from "@/pages/CategoryVotingPage";

import { doc, DocumentReference } from "firebase/firestore";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useGameStore } from "./gameStore";
import { IRound, Round } from "@/types/entities/game/rounds";
import { ICategoryVote } from "@/types/entities/game/rounds/voting";
import { ProcessType } from "@/types/entities/game";
import { buildGamePath } from "../utils/buildGamePath";


interface State {
    round: Maybe<Round>
}

interface Actions {
    setRound: (newRound: Maybe<Round>) => any;
    vote: (vote: ICategoryVote) => any;
}

interface Computed {
    getRoundRef: () => Maybe<DocumentReference>;
    getSpecificRound: <T extends IRound>(type: ProcessType) => Maybe<T>;
}

export const useRoundStore = create(
    immer<State & Actions & Computed>((set, get) => ({
        round: null,

        setRound: (newRound) => {
            set(state => { state.round = newRound })
        },

        vote: async (playerVote) => {
            const roundRef = get().getRoundRef();
            if (!roundRef) return;
            // Cancell if round process is not of 'voting' type 
            if (!get().round?.voting) return;

            const writtenVote = await vote(
                roundRef, 
                playerVote
            );

            if (!writtenVote) return;

            set(state => { 
                if (state.round?.voting) {
                    state.round.voting.votes.push(writtenVote);
                }
            })
        },
        
        getRoundRef: () => {
            const {game} = useGameStore.getState();
            if (!game) return null;

            const { round, tour } = game?.gameState.focus;
            if (!round || !tour) return null;

            return doc(firestore, `/${buildGamePath([game.id, tour, round])}`)
        },
        
        // @ts-ignore
        getSpecificRound: <T>(type: ProcessType) => {
            return type === get().round?.processType 
                ? get().round as T
                : null
        }
    }))
)

