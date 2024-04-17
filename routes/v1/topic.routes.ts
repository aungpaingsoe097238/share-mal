import { Router } from "express";
import { index } from "../../controllers/v1/topic.controller";
import errorMiddleware from "../../middlewares/errorMiddleware";
import authMiddleware from "../../middlewares/authMiddleware";
const router = Router();

router.get("/", authMiddleware, errorMiddleware(index));

export default router;