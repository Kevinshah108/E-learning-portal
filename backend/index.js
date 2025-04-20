
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

const allowedOrigins = ["https://e-learning-portal-frontend.vercel.app"];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api", courseRoutes)

<<<<<<< HEAD

=======
>>>>>>> 82be9d3a9247afec3fd879ac385e307769a7e5a1
app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB();
})
