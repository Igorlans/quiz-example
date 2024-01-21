import { ValidationErrorMessages } from "@/data/validationErrors";
import { usernameRegExp } from "@/shared/regex/username";
import * as yup from "yup";


export const registrationSchema = yup.object({
    username: yup
        .string()
        .trim()
        .required(ValidationErrorMessages.required)
        .min(3, ValidationErrorMessages.minLen)
        .max(30, ValidationErrorMessages.maxLen)
        .matches(usernameRegExp, {message: ValidationErrorMessages.username}),

    password: yup
        .string()
        .trim()
        .required(ValidationErrorMessages.required)
        .min(6, ValidationErrorMessages.minLen)
        .max(50, ValidationErrorMessages.maxLen),
        
    email: yup
        .string()
        .required(ValidationErrorMessages.required)
        .email(ValidationErrorMessages.email)
}).required();