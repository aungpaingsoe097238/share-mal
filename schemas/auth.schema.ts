import Joi from "joi";
import { SignInType, SignUpType } from "../types/auth.types";

export const signInSchema = Joi.object<SignInType>({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export const signUpSchema = Joi.object<SignUpType>({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  username: Joi.string().required().messages({
    "any.required": "Username is requird",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
  password_confirmation: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.required": "Password confirmation is required",
      "any.only": "Passwords must match",
    }),
});
