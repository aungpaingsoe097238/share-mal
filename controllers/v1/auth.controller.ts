import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";
import {
  comparePassword,
  hashPassword,
  responseErrorMessage,
  responseSuccessMessage,
} from "../../utils/helpers";

/**
 * Handle user sign-up
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - NextFunction
 */
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  const existingEmail = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (existingEmail) {
    return res.status(401).json({
      success: false,
      message: "Email already exists",
    });
  }

  const existingName = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  if (existingName) {
    return responseErrorMessage(
      res,
      "Invalid Credentials",
      "Name is already exist",
      401
    );
  }

  // Hashing Password
  const hash = hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hash,
    },
  });

  return responseSuccessMessage(res, "Sign Up Successfully", user);
};

/**
 * Handle user sign-in
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - NextFunction
 */
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const existingEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!existingEmail) {
    return responseErrorMessage(
      res,
      "Invalid Credential",
      "Email not found",
      401
    );
  }

  const existingPassword = comparePassword(password, existingEmail.password);

  if (!existingPassword) {
    return responseErrorMessage(
      res,
      "Invalid Credential",
      "Password does not match",
      401
    );
  }

  const user = {
    id: existingEmail.id,
    email: existingEmail.email,
    name: existingEmail.name,
    role: existingEmail.role,
  };

  return responseSuccessMessage(res, "Sign In Successfully", user);
};
