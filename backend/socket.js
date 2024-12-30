import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";

let io;  // Declare a variable to hold the io instance

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.Frontend_URL,  // Allow any domain, adjust as per your requirements
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Listen for specific events like 'updateSpaceCount'
        socket.on("updateSpaceCount", (data) => {
            console.log("Received updateSpaceCount:", data);
            io.emit("updateSpaceCount", data);  // Emit to all connected clients
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

const getIo = () => io;  // Function to access the initialized io instance

export { initSocket, getIo };  // Export both functions
