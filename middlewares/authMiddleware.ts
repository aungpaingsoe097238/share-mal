import { Request, Response, NextFunction } from "express";
import { responseErrorMessage, verifyToken } from "../utils/helpers";
import prisma from "../prisma/client";

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    // Check if the Authorization header exists
    if (!req.headers.authorization) {
      return responseErrorMessage(res, "Unauthorized", "Invalid token", 401);
    }

    const token = req.headers.authorization.split(" ")[1];
    // Verify the token
    const tokenVerify = verifyToken(token);

    // If verification fails (returns false or throws an error), return an error response
    if (!tokenVerify) {
      return responseErrorMessage(res, "Unauthorized", "Invalid token", 401);
    }

    // Attach the decoded token payload to the request object
    const user = await prisma.user.findFirst({
      where: {
        id: tokenVerify.id,
        email: tokenVerify.email,
      },
    });

    if (!user) {
      return responseErrorMessage(res, "Unauthorized", "User not found", 401);
    }

    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return responseErrorMessage(res, "Unauthorized", "Invalid token", 401);
  }
};

export default authMiddleware;
