import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import errorMiddleware from "../../middlewares/errorMiddleware";
import { signUpSchema } from "../../schemas/auth.schema";
import validationMiddleware from "../../middlewares/validationMiddleware";
import {
  index,
  create,
  show,
  destroy,
} from "../../controllers/v1/image.controller";
import { createImage } from "../../schemas/image.schema";
import fileUpload from "express-fileupload";
const router = Router();

router
  .route("/")
  .get(authMiddleware, errorMiddleware(index))
  .post(
    authMiddleware,
    validationMiddleware(createImage),
    errorMiddleware(create)
  );
router
  .route("/:id")
  .get(authMiddleware, errorMiddleware(show))
  .delete(authMiddleware, errorMiddleware(destroy));

export default router;
