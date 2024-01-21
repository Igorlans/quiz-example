import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { doc, DocumentReference } from "firebase/firestore";
import { firestore } from "@/firebase";
import { buildRoundStrucrture } from "../api/game/buildRoundStructure";
import { startGame } from "../api/game/startGame";
import { IRound } from "@/types/entities/game/rounds";
import { ITour } from "@/types/entities/game/tour";
import { IGame } from "@/types/entities/game";
import { buildGamePath } from "../utils/buildGamePath";



export type GameStructure = {
    game: IGame;
    tours: {
        value: ITour;
        rounds: {
            value: IRound
        }[]
    }[]
}

interface State {
    game: Maybe<IGame>;
    structure: Maybe<GameStructure>;
}

interface Actions {
    reset: () => any;
    setGame: (newGame: IGame) => any;
    startGame: () => any;
    buildStructure: () => any;
}

interface Computed {
    getGameRef: () => Maybe<DocumentReference>;
}

export const useGameStore = create(
    immer<State & Actions & Computed>((set, get) => ({
        game: null,
        structure: null,

        setGame: (newGame) => {
            set(state => { state.game = newGame })
        },

        buildStructure: async () => {
            const game = get().game
            if (!game) return;

            const structure = await buildRoundStrucrture(game.id);
            if (!structure) return

            set(state => {
                state.structure = structure
            })
        },

        reset: () => {
            set({
                game: null,
                structure: null
            })
        },

        startGame: () => {
            const isStarted = get().game?.gameState.startedAt;

            if (isStarted) return;

            startGame();
        },

        getGameRef: () => {
            const gameID = get().game?.id;
            if (!gameID) return null;

            return doc(firestore, buildGamePath([gameID]))
        }
    }))
)
