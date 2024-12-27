import { useState, useEffect } from "react";
import axiosInstance from "../api/axios.js";

const CheckPage = () => {
    const [status, setStatus] = useState("Checking...");

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const response = await axiosInstance.get("/api/health");
                setStatus(response.data.message || "Connected to backend successfully!");
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
