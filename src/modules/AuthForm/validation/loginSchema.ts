import { ValidationErrorMessages } from "@/data/validationErrors";
import * as yup from "yup";


export const loginSchema = yup.object({
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