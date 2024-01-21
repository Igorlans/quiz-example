import { ValidationErrorMessages } from "@/errors/inputValidationErrors"
import { usernameRegExp } from "@/shared/regex/username"
import * as yup from "yup";

export const playerRegistrationSchema = yup
    .object({
        username: yup
            .string()
            .trim()
            .required(ValidationErrorMessages.required)
            .min(3, ValidationErrorMessages.minLen)
            .max(30, ValidationErrorMessages.maxLen)
            .matches(usernameRegExp, {message: ValidationErrorMessages.username}),
        
        avatar: yup
            .mixed()
            .required(ValidationErrorMessages.required)
    })
    .required()