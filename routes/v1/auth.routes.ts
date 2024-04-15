import { Router } from "express";
import { signIn, signUp } from "../../controllers/v1/auth.controller";
import errorHandler from "../../middlewares/handlers/errorHandler";
import { signInSchema, signUpSchema } from "../../schemas/auth.schema";
const router = Router();

router.post("/sign-in", errorHandler(signIn, signInSchema));
router.post("/sign-up", errorHandler(signUp, signUpSchema));

export default router;
