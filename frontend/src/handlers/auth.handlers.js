import Cookies from "js-cookie";
import axiosInstance from "../api/axios";
import { toast } from "react-hot-toast";

const checkAuthentication = async (navigate) => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
        setTimeout(() => navigate("/login"), 1500);
        return { isAuthenticated: false, userId: null };
    }

    try {
        const response = await axiosInstance.post("/api/auth/checkUser", { accessToken });
        
        if (response.data.message === "User authenticated successfully.") {
            // const userId = response.data.id;
            Cookies.set("userId", response.data.id, { expires: 7 }); 
            return { isAuthenticated: true };
        } else {
            toast.error("Unauthorized");
            navigate("/login");
            return { isAuthenticated: false, userId: null };
        }
    } catch (error) {
        console.error("Authentication failed:", error);
        navigate("/login");
        return { isAuthenticated: false, userId: null };
    }
};

export {
    checkAuthentication
};
