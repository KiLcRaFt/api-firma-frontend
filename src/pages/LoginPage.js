import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(email, password); // API вызов
            const { isAdmin, id } = response;

            // Salvestamine localStorage
            localStorage.setItem("isAdmin", isAdmin.toString());
            localStorage.setItem("userId", id);

            // Taotluse staatuse uuendamine (kui kasutatakse `onLogin`)
            onLogin(isAdmin, id);

            // Ümbersuunamine
            navigate(isAdmin ? "/admin" : "/worker");
        } catch (error) {
            console.error("Autoriseerimisviga:", error);
            setErrorMessage(error.response?.data?.message || "Autoriseerimisviga:");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sisselogimine</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Salasõna"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Logi sisse
                    </button>
                </form>

                {errorMessage && (
                    <div className="mt-4 text-center text-red-500 font-medium">
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
