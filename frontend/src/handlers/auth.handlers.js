import Cookies from "js-cookie";
import axiosInstance from "../api/axios";
import { toast } from "react-hot-toast";

const checkAuthentication = async (navigate) => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
        toast.error("Invalid User. Redirecting to login...");
        navigate("/login");
        return { isAuthenticated: false, userId: null, errorMessage: "Access token missing." };
    }

    try {
        const response = await axiosInstance.post("/api/auth/checkUser", { accessToken });

        if (response.data.id) {
            const userId = response.data.id;
            Cookies.set("userId", userId, { expires: 7 });
            return { isAuthenticated: true, userId, errorMessage: null };
        } else {
            toast.error(response.data.message || "Unauthorized. Redirecting to login...");
            navigate("/login");
            return { isAuthenticated: false, userId: null, errorMessage: response.data.message || "Authentication failed." };
        }
    } catch (error) {
        console.error("Authentication failed:", error.response || error);
        toast.error("An error occurred. Redirecting to login...");
        navigate("/login");
        return {
            isAuthenticated: false,
            userId: null,
            errorMessage: error.response?.data?.message || "Internal server error.",
        };
    }
};

export { checkAuthentication };
