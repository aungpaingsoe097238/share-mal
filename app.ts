import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import fileUpload from "express-fileupload";

// Import Routes
import v1AuthRoutes from "./routes/v1/auth.routes";
import v1UserRoutes from "./routes/v1/user.routes";
import v1ProfileRoutes from "./routes/v1/profile.routes";
import v1TopicRoutes from "./routes/v1/topic.routes";
import v1PostRoutes from "./routes/v1/post.routes";
import v1ImageRoutes from "./routes/v1/image.routes";
import v1CommentRoutes from "./routes/v1/comment.routes";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(fileUpload());
app.use("/public/uploads", express.static("public/uploads"));

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", v1AuthRoutes);
app.use("/api/v1/users", v1UserRoutes);
app.use("/api/v1/profile", v1ProfileRoutes);
app.use("/api/v1/topics", v1TopicRoutes);
app.use("/api/v1/posts", v1PostRoutes);
app.use("/api/v1/images", v1ImageRoutes);
app.use("/api/v1/comments", v1CommentRoutes);

app.get("/", (req, res) => {
  res.json("Api is running");
});

app.use("*", (req, res) => {
  res.status(404).send({
    status: false,
    message: "Api route not found",
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 500;
  res.status(err.status).json({ status: false, message: err.message });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
