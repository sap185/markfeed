import { useState, useEffect } from "react";
import axiosInstance from "../api/axios.js";

const CheckPage = () => {
    const [status, setStatus] = useState("Checking...");

    useEffect(() => {
        const checkBackend = async () => {
            const authToken = Cookie.get("accessToken");
            try {
                const response = await axiosInstance.post("/api/auth/checkUser", authToken);
                setStatus(response.data.message || "Connected to user successfully!");
            } catch (error) {
                console.error("Error connecting to backend:", error);
                setStatus("Failed to connect to backend.");
            }
        };

        checkBackend();
    }, []);

    return (
        <div>
            <h1>CheckPage</h1>
            <p>Status: {status}</p>
        </div>
    );
};

export default CheckPage;
