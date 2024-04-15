import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import fileUpload from "express-fileupload";

// Import Routes
import v1UserRoutes from "./routes/v1/auth.routes";

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
app.use("/api/v1/auth", v1UserRoutes);

app.get("/", (req, res) => {
  res.json("Api is running");
});

app.use("*", (req, res) => {
  res.status(404).send({
    status: false,
    message: "Not found",
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
