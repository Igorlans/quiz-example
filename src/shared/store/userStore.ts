import { IUser } from "@/types/entities/user";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface State {
    user: Maybe<IUser>;
}

export interface Actions {
    signIn: (user: IUser) => any;
    signOut: () => any;
    updateAvatar: (avatar: string) => any;
}

export const useUserStore = create(
    immer<State & Actions>((set, get) => ({
        user: null,

        signIn: (newUser) => {
            set(state => { state.user = newUser })
        },

        signOut: () => {
            set(state => { state.user = null })
        },

        updateAvatar: (avatar: string) => {
            set(state => { 
                if (!state.user) return;
                state.user.avatar = avatar
            })
        }
    }))
) 
