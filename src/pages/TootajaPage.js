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
                const profileResponse = await axios.get('http://localhost:5095/tootaja/andmed', {
                    headers: { UserId: localStorage.getItem("userId") },
                });
                console.log('profileResponse:', profileResponse.data); // Вывод данных профиля
                setProfileData(profileResponse.data);

                const workHoursResponse = await axios.get('http://localhost:5095/tootaja/tooaeg', {
                    headers: { UserId: localStorage.getItem("userId") },
                });
                console.log('workHoursResponse:', workHoursResponse.data); // Вывод данных рабочих часов
                setWorkHours(workHoursResponse.data?.$values || []); // Пытаемся получить рабочие часы
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const addWorkHours = async (kuupaev, tooAlgus, tooLypp) => {
        try {
            const userId = localStorage.getItem("userId");

            // Убедитесь, что время не пустое
            if (!tooAlgus || !tooLypp) {
                throw new Error("Необходимо указать время начала и окончания работы.");
            }

            // Преобразуем время в строку формата hh:mm:ss, если оно в формате hh:mm
            const formattedTooAlgus = tooAlgus.length === 5 ? tooAlgus + ':00' : tooAlgus; // Пример: "04:23" -> "04:23:00"
            const formattedTooLypp = tooLypp.length === 5 ? tooLypp + ':00' : tooLypp;   // Пример: "11:27" -> "11:27:00"

            // Оборачиваем данные в объект TooAeg_Andmed
            const requestData = {
                kuupaev,                  // Дата в формате ISO 8601, например "2024-12-05"
                TooAlgus: formattedTooAlgus,   // Время начала работы
                TooLypp: formattedTooLypp      // Время окончания работы
            };

            // Отправляем запрос на сервер
            const response = await axios.post('http://localhost:5095/tootaja/tooaeg_lisamine', requestData, {
                headers: { UserId: userId },
            });

            console.log('Рабочие часы добавлены:', response.data);

            // Перезагружаем рабочие часы
            const updatedWorkHoursResponse = await axios.get('http://localhost:5095/tootaja/tooaeg', {
                headers: { UserId: userId },
            });

            setWorkHours(updatedWorkHoursResponse.data.$values || []); // Обновляем состояние с новыми рабочими часами
        } catch (err) {
            setError(err.message || "Не удалось добавить рабочие часы");
            console.error("Ошибка при добавлении рабочих часов:", err);
        }
    };

    const updateWorkHours = async (id, kuupaev, tooAlgus, tooLypp) => {
        try {
            const userId = localStorage.getItem("userId");

            // Убедитесь, что время не пустое
            if (!tooAlgus || !tooLypp) {
                throw new Error("Необходимо указать время начала и окончания работы.");
            }

            // Преобразуем время в строку формата hh:mm:ss
            const formattedTooAlgus = tooAlgus.length === 5 ? tooAlgus + ':00' : tooAlgus;
            const formattedTooLypp = tooLypp.length === 5 ? tooLypp + ':00' : tooLypp;

            // Оборачиваем данные в объект TooAeg_Andmed
            const requestData = {
                kuupaev,
                TooAlgus: formattedTooAlgus,
                TooLypp: formattedTooLypp
            };

            // Отправляем запрос на сервер для обновления рабочего времени
            const response = await axios.put(`http://localhost:5095/tootaja/tooaeg_muudamine?tooaegaId=${id}`, requestData, {
                headers: { UserId: userId },
            });

            console.log('Рабочие часы обновлены:', response.data);

            // Перезагружаем рабочие часы
            const updatedWorkHoursResponse = await axios.get('http://localhost:5095/tootaja/tooaeg', {
                headers: { UserId: userId },
            });

            setWorkHours(updatedWorkHoursResponse.data.$values || []); // Обновляем состояние с новыми рабочими часами
        } catch (err) {
            setError(err.message || "Не удалось обновить рабочие часы");
            console.error("Ошибка при обновлении рабочих часов:", err);
        }
    };

    const deleteWorkHours = async (id) => {
        try {
            const userId = localStorage.getItem("userId");
            await axios.delete(`http://localhost:5095/tootaja/tooaeg_kustutamine?tooaegaId=${id}`, {
                headers: { UserId: userId },
            });

            // Перезагружаем рабочие часы после удаления
            const updatedWorkHoursResponse = await axios.get('http://localhost:5095/tootaja/tooaeg', {
                headers: { UserId: userId },
            });
            setWorkHours(updatedWorkHoursResponse.data.$values || []);
        } catch (err) {
            setError(err.message || "Не удалось удалить рабочие часы");
        }
    };

    return (
        <div>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>Ошибка: {error}</p>
            ) : (
                <div>
                    <h1>Профиль</h1>
                    <pre>{JSON.stringify(profileData, null, 2)}</pre>

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
