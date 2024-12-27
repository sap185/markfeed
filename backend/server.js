import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";

// For Auth
import authRoutes from "./routes/auth.routes.js";

// For other routes
// import SpaceRouter from "./routes/Space.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

// Middlewares 
app.use(corsMiddleware);
app.use(express.json());

// Routes : - authentication routes
app.use("/api/auth", authRoutes);
// app.use("/api", SpaceRouter);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
