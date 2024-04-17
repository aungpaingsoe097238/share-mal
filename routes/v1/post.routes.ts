import { Router } from "express";
import {
  create,
  destroy,
  index,
  update,
} from "../../controllers/v1/post.controller";
import errorMiddleware from "../../middlewares/errorMiddleware";
import authMiddleware from "../../middlewares/authMiddleware";
import validationMiddleware from "../../middlewares/validationMiddleware";
import { createPostSchema, updatePostSchema } from "../../schemas/post.schema";
const router = Router();

router
  .route("/")
  .get(authMiddleware, errorMiddleware(index))
  .post(
    authMiddleware,
    validationMiddleware(createPostSchema),
    errorMiddleware(create)
  );

router
  .route("/:slug")
  .get(authMiddleware, errorMiddleware(create))
  .put(
    authMiddleware,
    validationMiddleware(updatePostSchema),
    errorMiddleware(update)
  )
  .delete(authMiddleware, errorMiddleware(destroy));

export default router;
