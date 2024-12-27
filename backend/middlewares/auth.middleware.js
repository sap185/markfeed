import jwt from "jsonwebtoken";
import User from "../models/User.models";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        const IncomingToken = req.headers.authorization?.split(" ")[1];
        if (!IncomingToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(IncomingToken, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default authMiddleware;