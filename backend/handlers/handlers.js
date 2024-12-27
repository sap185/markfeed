import User from "../models/User.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//signup handler in backend
export const SignIn = async (req, res) => {
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
        console.error("Error in SignIn:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// Login Handler backend
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found.");
            return res.status(401).json({ message: "User Not Found, Please Sign Up." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password isn't correct ! 🙄 " });
        }
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ accessToken });
    } catch (error) {
        console.error("Error in Login:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};
