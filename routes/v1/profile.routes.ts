import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import { me, update } from "../../controllers/v1/profile.controller";
import validationMiddleware from "../../middlewares/validationMiddleware";
import { updateProfileSchema } from "../../schemas/profile.schema";
import errorMiddleware from "../../middlewares/errorMiddleware";
const router = Router();

router.get("/me", authMiddleware, errorMiddleware(me));
router.put("/update", authMiddleware, validationMiddleware( updateProfileSchema ), errorMiddleware(update));

export default router;