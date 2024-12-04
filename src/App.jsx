import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import EmployeeDashboard from './pages/TootajaPage';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route
                        path="/admin"
                        element={<ProtectedRoute role="admin">
                            <AdminPage />
                        </ProtectedRoute>}
                    />
                    <Route
                        path="/tootaja"
                        element={<ProtectedRoute role="tootaja">
                            <EmployeeDashboard />
                        </ProtectedRoute>}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
