import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import http from "http";  // Import http module to create a server

// Import Routes
import authRoutes from "./routes/auth.routes.js";
import SpaceRouter from "./routes/Space.routes.js";

// Import socket initialization
import {initSocket} from "./socket.js";  // Import socket setup

dotenv.config();

const app = express();
const server = http.createServer(app);  // Create an HTTP server

const PORT = process.env.PORT || 5001;
connectDB();

// Middlewares
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", SpaceRouter);

// Initialize Socket.IO with the server
const io = initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
