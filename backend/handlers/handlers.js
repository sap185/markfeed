import User from "../models/User.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_EXPIRES_IN = "10d";
const REFRESH_TOKEN_EXPIRES_IN = "30d";

// Signup Handler
const SignUp = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ email, name, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error("Error in SignUp:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// Login Handler
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
        );
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
        );

        user.refreshToken = refreshToken;
        await user.save();
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.error("Error in Login:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

const checkUser = async (req, res) => {
    try {
        const { accessToken } = req.body;

        if (!accessToken) {
            console.error("Access Token is missing in the request.");
            return res.status(400).json({ message: "Access token is required." });
        }

        jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    console.error("Access token expired.");
                    return res.status(401).json({ message: "Access token expired." });
                }
                console.error("Invalid access token.");
                return res.status(401).json({ message: "Invalid access token." });
            }

            const user = await User.findById(decoded.userId);
            if (!user) {
                console.error("User  not found.");
                return res.status(404).json({ message: "User  not found." });
            }
            res.status(200).json({ message: "User  authenticated successfully.", id: user._id.toString() });

        });
    } catch (error) {
        console.error("Error in checkUser :", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


export {
    SignUp,
    Login,
    checkUser
};
