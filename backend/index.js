
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./src/lib/db.js";
import authRoutes from "./src/routes/auth.route.js";
import courseRoutes from "./src/routes/course.route.js"

dotenv.config();
const app= express();

const PORT = process.env.PORT 

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api", courseRoutes)

app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB();
})