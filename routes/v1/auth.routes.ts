import { Router } from "express";
import { signIn, signUp } from "../../controllers/v1/auth.controller";
import errorMiddleware from "../../middlewares/errorMiddleware";
import { signInSchema, signUpSchema } from "../../schemas/auth.schema";
import validationMiddleware from "../../middlewares/validationMiddleware";
const router = Router();

router.post(
  "/sign-in",
  validationMiddleware(signInSchema),
  errorMiddleware(signIn)
);
router.post(
  "/sign-up",
  validationMiddleware(signUpSchema),
  errorMiddleware(signUp)
);

export default router;
