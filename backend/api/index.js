import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "../src/lib/db.js";
import authRoutes from "../src/routes/auth.route.js";
import courseRoutes from "../src/routes/course.route.js";
import serverless from "serverless-http";

dotenv.config();
connectDB();  // Connect DB once when serverless function boots

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://e-learning-portal-frontend.vercel.app", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);

// Export serverless handler instead of app.listen
export const handler = serverless(app);
