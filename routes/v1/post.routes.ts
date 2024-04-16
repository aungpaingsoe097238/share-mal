import { Router } from "express";
import { index } from "../../controllers/v1/post.controller";
import errorMiddleware from "../../middlewares/errorMiddleware";
const router = Router();

router.get("/" ,errorMiddleware(index));

export default router;