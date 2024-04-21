import { Router } from "express";
import {
  create,
  destroy,
  index,
  show,
  update,
} from "../../controllers/v1/post.controller";
import errorMiddleware from "../../middlewares/errorMiddleware";
import authMiddleware from "../../middlewares/authMiddleware";
import validationMiddleware from "../../middlewares/validationMiddleware";
import { createPostSchema, updatePostSchema } from "../../schemas/post.schema";
const router = Router();

router
  .route("/")
  .get(errorMiddleware(index))
  .post(
    authMiddleware,
    validationMiddleware(createPostSchema),
    errorMiddleware(create)
  );

router
  .route("/:slug")
  .get(errorMiddleware(show))
  .put(
    authMiddleware,
    validationMiddleware(updatePostSchema),
    errorMiddleware(update)
  )
  .delete(authMiddleware, errorMiddleware(destroy));

export default router;
