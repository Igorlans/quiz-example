import { IDatabasePlayer, IPlayer } from '@/types/entities/player';
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
    players: IDatabasePlayer[];
}

interface Actions {
    updatePlayers: (updatedPlayers: IDatabasePlayer[]) => any;
}

export const usePlayersStore = create(
    immer<State & Actions>((set, get) => ({
        players: [],

        updatePlayers: (players) => {
            set(state => {
                state.players = players
            })
        }
    }))
)
