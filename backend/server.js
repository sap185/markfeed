import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";

import { SignIn, Login } from "./handlers/handlers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.post("/api/SignIn", SignIn);
app.post("/api/login", Login);





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
