import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";
import {
  comparePassword,
  generateExpiresDate,
  generateToken,
  hashPassword,
  responseErrorMessage,
  responseSuccessMessage,
  verifyToken,
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
  const { name, username, email, password } = req.body;

  const existingEmail = await prisma.user.findUnique({
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
      message: { email: "Email already exists" },
    });
  }

  const existingName = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  if (existingName) {
    return responseErrorMessage(
      res,
      "Invalid Credentials",
      {
        name: "Name is already exist",
      },
      401
    );
  }

  const existingUserName = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUserName) {
    return responseErrorMessage(
      res,
      "Invalid Credentials",
      {
        username: "Username is already taken",
      },
      401
    );
  }

  // Hashing Password
  const hash = hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      username,
      password: hash,
      profile: {
        create: {
          bio: "",
          dob: "",
          phone: "",
        },
      },
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      createdAt: true,
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

  const existingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingEmail) {
    return responseErrorMessage(
      res,
      "Unauthorized",
      {
        email: "Email not found",
      },
      401
    );
  }

  const existingPassword = comparePassword(password, existingEmail.password);

  if (!existingPassword) {
    return responseErrorMessage(
      res,
      "Unauthorized",
      {
        password: "Password does not match",
      },
      401
    );
  }

  const token = generateToken(existingEmail.id, existingEmail.email, "30d");

  const user = {
    id: existingEmail.id,
    email: existingEmail.email,
    name: existingEmail.name,
    role: existingEmail.role,
    token,
  };

  return responseSuccessMessage(res, "Sign In Successfully", user);
};

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, exp } = verifyToken(req.body.token);

  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    return responseErrorMessage(
      res,
      "Unauthorized",
      {
        token: "Invalid token",
      },
      401
    );
  }

  const expDate = generateExpiresDate(exp);

  return responseSuccessMessage(res, "Token is valid", {
    expired_date: expDate,
  });
};
