import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import WorkerPage from "./pages/TootajaPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem("isAdmin");
        const userId = localStorage.getItem("userId");

        if (role && userId) {
            setIsLoggedIn(true);
            setUserRole(role === "true" ? "admin" : "worker");
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<LoginPage onLogin={(isAdmin, userId) => {
                        setIsLoggedIn(true);
                        setUserRole(isAdmin ? "admin" : "worker");
                    }} />}
                />
                <Route
                    path="/admin"
                    element={isLoggedIn && userRole === "admin" ? <AdminPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/worker"
                    element={isLoggedIn && userRole === "worker" ? <WorkerPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn ? (
                            userRole === "admin" ? <Navigate to="/admin" /> : <Navigate to="/worker" />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
