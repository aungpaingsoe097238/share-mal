import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import { me, update } from "../../controllers/v1/profile.controller";
import validationMiddleware from "../../middlewares/validationMiddleware";
import { updateSchema } from "../../schemas/profile.schema";
import errorMiddleware from "../../middlewares/errorMiddleware";
const router = Router();

router.get("/me", authMiddleware, errorMiddleware(me));
router.put("/update", authMiddleware, validationMiddleware( updateSchema ), errorMiddleware(update));

export default router;
