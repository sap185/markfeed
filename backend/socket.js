import { Server } from "socket.io";
import dotenv from "dotenv";
// import Space from "../backend/models/Spaces.models";

dotenv.config();

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.Frontend_URL || "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`New connection: ${socket.id}`);

        // socket.on("updateSpaceCount", async() => {
        //     const count =await Space.countDocuments({ userId: socket.id });
        //     // io.emit("updateSpaceCount", { userId: socket.id, spaceCount: count });
        //     console.log(io.emit("updateSpaceCount", { userId: socket.id, spaceCount: count }));
            
        // });
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return io;
};

const getIo = () => io;

export { initSocket, getIo };
