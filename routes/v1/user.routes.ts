import { Router } from "express";
import { index, show } from "../../controllers/v1/user.controller";
import errorMiddleware from "../../middlewares/errorMiddleware";
const router = Router();

router.get("/", errorMiddleware(index));
router.get("/:id", errorMiddleware(show));

export default router;
