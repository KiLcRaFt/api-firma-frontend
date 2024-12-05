import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkerTable from "../components/Admin/WorkerTable";
import WorkHoursTable from "../components/Admin/WorkHoursTable";
import AddWorkerForm from "../components/Admin/AddWorkerForm";
import AddWorkHourForm from "../components/Admin/AddWorkHourForm";

const AdminPanel = ({ onLogout }) => {
    const [profileData, setProfileData] = useState(null);
    const [workHours, setWorkHours] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    setError("Kasutaja ei ole volitatud.");
                    return;
                }

                const profileResponse = await axios.get(
                    "http://localhost:5095/auth/profile",
                    { headers: { UserId: userId } }
                );
                setProfileData(profileResponse.data);

                const employeesResponse = await axios.get(
                    "http://localhost:5095/admin/tootajad",
                    { headers: { UserId: userId } }
                );
                setEmployees(employeesResponse.data.$values || []);

                const workHoursResponse = await axios.get(
                    "http://localhost:5095/admin/tooaeg",
                    { headers: { UserId: userId } }
                );
                setWorkHours(workHoursResponse.data.$values || []);
            } catch (err) {
                setError("Andmete laadimisviga");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const generateReport = () => {
        // Пример простого отчёта: список сотрудников
        const reportContent = employees
            .map((emp) => `${emp.nimi} ${emp.perenimi} - ${emp.telefoni_number} - ${emp.email} - ${emp.amet}`)
            .join('\n');

        const blob = new Blob([reportContent], {type: 'text/plain;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'TootajateAruanne.txt';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        onLogout();
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center p-8">
            {loading ? (
                <p className="text-white text-2xl animate-pulse">Laadimine...</p>
            ) : error ? (
                <p className="text-red-500 text-xl">{error}</p>
            ) : (
                <>
                    <button
                        onClick={handleLogout}
                        className="mb-6 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Logi välja
                    </button>

                    <div className="w-full max-w-7xl space-y-8">
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md text-white">
                            <h2 className="text-3xl font-bold mb-4">Konto</h2>
                            {profileData ? (
                                <div>
                                    <p>
                                        <span className="font-bold">Email:</span>{" "}
                                        {profileData.email}
                                    </p>
                                </div>
                            ) : (
                                <p>Profiiliandmete allalaadimine...</p>
                            )}
                        </div>

                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md text-white">
                            <h2 className="text-3xl font-bold mb-4">Töötajad</h2>
                            <WorkerTable
                                workers={employees}
                                onDeleteWorker={(workerId) =>
                                    setEmployees((prev) =>
                                        prev.filter((worker) => worker.id !== workerId)
                                    )
                                }
                            />
                            <AddWorkerForm onWorkerAdded={() => {}} />
                            <button
                                onClick={generateReport}
                                className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 mr-4"
                            >
                                Aruande koostamine
                            </button>
                        </div>

                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md text-white">
                            <h2 className="text-3xl font-bold mb-4">Töö tunnid</h2>
                            <WorkHoursTable
                                workHours={workHours}
                                tootajad={employees}
                                onDelete={(workHourId) =>
                                    setWorkHours((prev) =>
                                        prev.filter((workHour) => workHour.id !== workHourId)
                                    )
                                }
                                onUpdate={() => {}}
                            />
                            <AddWorkHourForm employees={employees} onWorkHourAdded={() => {}} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminPanel;
