import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth"; // Assuming this is where you handle the login API

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(email, password); // Assuming login function returns the user data

            // Assuming response contains user info
            const { isAdmin, id } = response;

            // Store in localStorage
            localStorage.setItem("isAdmin", isAdmin.toString());
            localStorage.setItem("userId", id);

            // Set states if necessary (not essential if using localStorage only)
            // setIsLoggedIn(true);
            // setUserRole(isAdmin ? "admin" : "worker");

            // Redirect based on role
            if (isAdmin) {
                navigate("/admin");
            } else {
                navigate("/worker");
            }
        } catch (error) {
            setErrorMessage("Login failed. Please try again.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default LoginPage;
