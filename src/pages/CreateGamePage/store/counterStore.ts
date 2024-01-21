import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MAX_PLAYERS_COUNT, MIN_PLAYERS_COUNT } from "../constants/playersLimits";

interface State {
    count: number;
}

interface Actions {
    increment: () => any;
    decrement: () => any;
}

interface Computed {
    isMax: () => boolean;
    isMin: () => boolean;
}

export const useCounterStore = create(
    immer<State & Actions & Computed>((set, get) => ({
        count: MIN_PLAYERS_COUNT,

        increment: () => {
            if (get().isMax()) return;

            set(state => {state.count += 1})
        },

        decrement: () => {
            if (get().isMin()) return;

            set(state => {state.count -= 1})
        },

        isMax: () => get().count >= MAX_PLAYERS_COUNT,
        isMin: () => get().count <= MIN_PLAYERS_COUNT
    }))
)