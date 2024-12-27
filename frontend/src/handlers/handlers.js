import axiosInstance from "../api/axios";
import Cookies from "js-cookie";

export const handleSignUpDetailsSubmit = async (email, name, password, cnfmPassword) => {
    if (!password === cnfmPassword) {
        return "password not matched ";
    }
    else {
        try {
            const response = await axiosInstance.post("/api/auth/SignUp", { email, name, password });
            return response.data; // Successful response
        } catch (error) {
            // Improved error handling
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            console.error("Sign-Up request failed:", error.message, { email, name });
            throw new Error(errorMessage);
        }
    }
};


export const loginHandlerRequest = async (email, password) => {
    try {
        // console.log("Sending login request with:", { email });

        const response = await axiosInstance.post("/api/auth/login", { email, password });

        // console.log("Response received from backend:", response.data);

        if (response.status === 200 && response.data?.accessToken) {
            // console.log("Token received:", response.data.accessToken);
            Cookies.set("accessToken", response.data.accessToken, { sameSite: "strict" }, { secure: true }, { httpOnly: true });
            return response.data;
        } else {
            console.log("Unexpected response:", response);
            throw new Error("Unexpected response structure from backend.");
        }

    } catch (error) {
        console.error("Login request failed:", {
            message: error.message,
            response: error.response?.data,
        });

        const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
        throw new Error(errorMessage);
    }
};