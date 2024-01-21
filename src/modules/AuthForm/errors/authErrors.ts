
import { AuthError } from "@/pages/AuthPage";
import { AuthErrorCodesValues } from "../types";

export const authErrors: Partial<Record<AuthErrorCodesValues, AuthError>> = {
    'auth/user-not-found': {
        field: 'email',
        message: 'Користувача не знайдено'
    },
    'auth/wrong-password': {
        field: 'password',
        message: 'Неправильний пароль'
    },
    'auth/email-already-in-use': {
        field: 'email',
        message: 'Цей email вже зайнятий'
    },
    'auth/weak-password': {
        field: 'password',
        message: 'Пароль повинен містити хоча б 6 символів'
    }
}