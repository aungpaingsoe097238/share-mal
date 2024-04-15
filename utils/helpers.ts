import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Hashes a plain text password using bcrypt.
 * @param plain - The plain text password to hash.
 * @returns The hashed password.
 */
export const hashPassword = (plain: string): string =>
  bcrypt.hashSync(plain, 10);

/**
 * Compares a plain text password with a hashed password.
 * @param plain - The plain text password.
 * @param hash - The hashed password to compare against.
 * @returns True if the plain text password matches the hashed password, false otherwise.
 */
export const comparePassword = (plain: string, hash: string): boolean =>
  bcrypt.compareSync(plain, hash);

/**
 * Generates a JWT token with the provided user ID and email.
 * @param id - The user ID.
 * @param email - The user email.
 * @returns The generated JWT token.
 */
export const generateToken = (id: string, email: string): string =>
  jwt.sign({ id, email }, process.env.TOKEN_SECRET as string, {
    expiresIn: "1h",
  });

/**
 * Verifies and decodes a JWT token.
 * @param token - The JWT token to verify.
 * @returns The decoded token payload if verification is successful.
 */
export const verifyToken = (token: string): any =>
  jwt.verify(token, process.env.TOKEN_SECRET as string);

/**
 * Sends a success response with the provided message and data.
 * @param res - The Express Response object.
 * @param message - The success message.
 * @param data - The data to include in the response.
 */
export const responseSuccessMessage = (
  res: Response,
  message: string,
  data: any
) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

/**
 * Sends an error response with the provided message, errors, and status code.
 * @param res - The Express Response object.
 * @param message - The error message.
 * @param errors - The error details or additional information.
 * @param code - The HTTP status code to send.
 */
export const responseErrorMessage = (
  res: Response,
  message: string,
  errors: any,
  code: number
) => {
  return res.status(code).json({
    success: false,
    message,
    errors,
  });
};
