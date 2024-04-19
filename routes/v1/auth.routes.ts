import { Router } from "express";
import { checkToken, signIn, signUp } from "../../controllers/v1/auth.controller";
import errorMiddleware from "../../middlewares/errorMiddleware";
import { checkTokenSchema, signInSchema, signUpSchema } from "../../schemas/auth.schema";
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
router.post("/check-token", validationMiddleware(checkTokenSchema), errorMiddleware(checkToken));

export default router;
