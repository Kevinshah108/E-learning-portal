import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "../src/lib/db.js";
import authRoutes from "../src/routes/auth.route.js";
import courseRoutes from "../src/routes/course.route.js";
import serverless from "serverless-http";

dotenv.config();
connectDB();

const app = express();

// --- CORS Fix Start ---
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://e-learning-portal-frontend.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});
// --- CORS Fix End ---

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);

// Export for Vercel Serverless
export const handler = serverless(app);
