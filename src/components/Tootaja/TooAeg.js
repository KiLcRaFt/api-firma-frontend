import React, { useState } from 'react';

const TooAeg = ({ workHours, onAdd, onUpdate, onDelete }) => {
    const [kuupaev, setKuupaev] = useState("");
    const [tooAlgus, setTooAlgus] = useState("");
    const [tooLypp, setTooLypp] = useState("");

    // Проверяем, что workHours — это массив
    const hours = Array.isArray(workHours) ? workHours : [];

    return (
        <div>
            <h2>Рабочие часы</h2>
            {hours.length > 0 ? (
                <ul>
                    {hours.map((hour) => (
                        <li key={hour.id}>
                            {hour.kuupaev}: {hour.too_algus} - {hour.too_lypp}
                            <button onClick={() => onDelete(hour.id)}>Удалить</button>
                            <button onClick={() => onUpdate(hour.id, hour.kuupaev, hour.too_algus, hour.too_lypp)}>
                                Редактировать
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нет рабочих часов для отображения.</p>
            )}

            <h3>Добавить рабочие часы</h3>
            <input
                type="date"
                value={kuupaev}
                onChange={(e) => setKuupaev(e.target.value)}
            />
            <input
                type="time"
                value={tooAlgus}
                onChange={(e) => setTooAlgus(e.target.value)}
            />
            <input
                type="time"
                value={tooLypp}
                onChange={(e) => setTooLypp(e.target.value)}
            />
            <button onClick={() => onAdd(kuupaev, tooAlgus, tooLypp)}>Добавить</button>
        </div>
    );
};

export default TooAeg;
