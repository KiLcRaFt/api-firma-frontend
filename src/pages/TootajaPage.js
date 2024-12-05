import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TooAeg from '../components/Tootaja/TooAeg';

const TootajaPage = ({ onLogout }) => {
    const [profileData, setProfileData] = useState(null);
    const [workHours, setWorkHours] = useState([]);
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

                const profileResponse = await axios.get('http://localhost:5095/tootaja/andmed', {
                    headers: { UserId: userId },
                });
                setProfileData(profileResponse.data);

                const workHoursResponse = await axios.get('http://localhost:5095/tootaja/tooaeg', {
                    headers: { UserId: userId },
                });
                setWorkHours(Array.isArray(workHoursResponse.data?.$values) ? workHoursResponse.data.$values : []);
            } catch (err) {
                console.error("Andmete laadimisviga:", err.response?.data || err.message);
                setError(err.response?.data?.message || "Andmete laadimisviga");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addWorkHours = async (kuupaev, tooAlgus, tooLypp) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("Kasutaja ei ole volitatud.");

            if (!tooAlgus || !tooLypp) throw new Error("Sisestage algus- ja lõpuaeg.");

            const requestData = { kuupaev, TooAlgus: `${tooAlgus}:00`, TooLypp: `${tooLypp}:00` };
            await axios.post('http://localhost:5095/tootaja/tooaeg_lisamine', requestData, { headers: { UserId: userId } });
            await refreshWorkHours();
        } catch (err) {
            setError(err.message || "Ошибка добавления рабочих часов.");
        }
    };

    const updateWorkHours = async (id, kuupaev, tooAlgus, tooLypp) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("Пользователь не авторизован.");

            if (!tooAlgus || !tooLypp) throw new Error("Введите время начала и окончания.");

            const requestData = {
                Kuupaev: kuupaev,
                TooAlgus: `${tooAlgus}:00`,
                TooLypp: `${tooLypp}:00`
            };

            const response = await axios.put(
                `http://localhost:5095/tootaja/tooaeg_muudamine?tooaegaId=${id}`,
                requestData,
                { headers: { UserId: userId } }
            );

            if (response.status === 200) {
                console.log('Tööaeg on edukalt ajakohastatud');
                await refreshWorkHours();
            }
        } catch (err) {
            console.error("Viga tööaja ajakohastamisel", err);
            setError(err.message || "Viga tööaja ajakohastamisel.");
        }
    };

    const deleteWorkHours = async (id) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("Kasutaja ei ole volitatud.");

            await axios.delete(`http://localhost:5095/Tootaja/tooaeg_kustutamine?tooaegaId=${id}`, {
                headers: { UserId: userId },
            });

            await refreshWorkHours();
        } catch (err) {
            setError(err.message || "Viga töötundide kustutamisel.");
        }
    };

    const refreshWorkHours = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await axios.get('http://localhost:5095/tootaja/tooaeg', { headers: { UserId: userId } });
            setWorkHours(Array.isArray(response.data?.$values) ? response.data.$values : []);
        } catch (err) {
            setError("Andmete uuendamise viga.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        onLogout();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {loading ? (
                <p className="text-center text-gray-600">Laadimine...</p>
            ) : error ? (
                <p className="text-center text-red-500">Viga: {error}</p>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Töötaja Profiil</h2>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                        >
                            Logi välja
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="font-medium text-lg text-gray-600">Email: {profileData?.email}</span>
                        </div>
                    </div>

                    <TooAeg
                        workHours={workHours}
                        onAdd={addWorkHours}
                        onUpdate={updateWorkHours}
                        onDelete={deleteWorkHours}
                    />
                </div>
            )}
        </div>
    );
};

export default TootajaPage;
