import { Router } from "express";
import { index } from "../../controllers/v1/user.controller";
import authMiddleware from "../../middlewares/authMiddleware";
import errorMiddleware from "../../middlewares/errorMiddleware";
const router = Router();

router.get("/", authMiddleware, errorMiddleware(index));

export default router;
