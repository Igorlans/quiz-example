import { AuthError } from "@/pages/AuthPage";

import { authErrors } from "../errors/authErrors";
import { AuthErrorCodesValues } from "../types";

export const handleErrorTransform = (error: AuthErrorCodesValues | any): Maybe<AuthError> => {
    if (!Object.keys(authErrors).includes(error)) return null;

    return authErrors[error as AuthErrorCodesValues] ?? null;
}