import { Router } from "express";
import {
  create,
  destroy,
  index,
  show,
  update,
} from "../../controllers/v1/comment.controller";
import errorMiddleware from "../../middlewares/errorMiddleware";
import authMiddleware from "../../middlewares/authMiddleware";
import validationMiddleware from "../../middlewares/validationMiddleware";
import {
  createCommentSchema,
  updateCommentSchema,
} from "../../schemas/comment.schema";
const router = Router();

router
  .route("/")
  .get(errorMiddleware(index))
  .post(
    authMiddleware,
    validationMiddleware(createCommentSchema),
    errorMiddleware(create)
  );

router
  .route("/:id")
  .get(errorMiddleware(show))
  .put(
    authMiddleware,
    validationMiddleware(updateCommentSchema),
    errorMiddleware(update)
  )
  .delete(authMiddleware, errorMiddleware(destroy));

export default router;
