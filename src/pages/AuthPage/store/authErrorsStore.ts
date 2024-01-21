import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { AuthError } from "../types";

interface State {
    errors: AuthError[]
}

interface Actions {
    addError: (error: AuthError) => any;
    removeError: (errorMessage: string) => any;
    clearErrors: () => any;
}

export const useAuthErrorsStore = create(
    immer<State & Actions>((set) => ({
        errors: [],
        
        addError: (error) => {
            set(state => { state.errors.push(error) })
        },

        removeError: (errorMessage) => {
            set((state) => { 
                state.errors = state.errors.filter(error => error.message !== errorMessage)
            })
        },

        clearErrors: () => {
            set(state => { state.errors = [] })
        }
    }))
)