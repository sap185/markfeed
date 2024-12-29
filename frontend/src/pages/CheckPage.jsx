import { useState, useEffect } from "react";
import { checkAuthentication } from "../handlers/auth.handlers";

const CheckPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const authenticate = async () => {
            const { isAuthenticated, userId, errorMessage } = await checkAuthentication();
            setIsAuthenticated(isAuthenticated);
            setUserId(userId);
            setErrorMessage(errorMessage);
        };
        authenticate();
    }, []);

    return (
        <div>
            <h1>CheckPage</h1>
            <p>Check the console for the authentication status.</p>
            <p>isAuthenticated: {isAuthenticated ? "Yes" : "No"}</p>
            {errorMessage && <p style={{ color: "red" }}>Error: {errorMessage}</p>}
            {userId && <p>UserId: {userId}</p>}
        </div>
    );
};

export default CheckPage;