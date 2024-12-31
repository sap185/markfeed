import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const CheckPage = () => {
    const [spaceCount, setSpaceCount] = useState(0);
    const [data, setData] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:5001");

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });
        try {
            socket.on("updateSpaceCount", (data) => {
                console.log("Received updated space count:", data);
                const userId = Cookies.get("userId");
                setData(data);
                if (data.userId === userId) {
                    console.log("Setting space count:", data.spaceCount);
                    setSpaceCount(data.spaceCount || 0);
                }
            });
        } catch (error) {
            console.error("Error handling updateSpaceCount:", error);
        }


        // Cleanup on component unmount
        return () => {
            socket.removeAllListeners();
            socket.disconnect();
            console.log("Socket disconnected.");
        };
    }, []);

    return (
        <div>
            Space Count: {spaceCount} <br />
            userId : {Cookies.get("userId")} <br />
            data : {data}
        </div>);
};

export default CheckPage;
