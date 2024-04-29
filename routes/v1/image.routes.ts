import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import errorMiddleware from "../../middlewares/errorMiddleware";
import validationMiddleware from "../../middlewares/validationMiddleware";
import {
  index,
  create,
  show,
  destroy,
} from "../../controllers/v1/image.controller";
import { createImageSchema } from "../../schemas/image.schema";
const router = Router();

router
  .route("/")
  .get(authMiddleware, errorMiddleware(index))
  .post(
    authMiddleware,
    validationMiddleware(createImageSchema),
    errorMiddleware(create)
  );
router
  .route("/:id")
  .get(authMiddleware, errorMiddleware(show))
  .delete(authMiddleware, errorMiddleware(destroy));

export default router;
